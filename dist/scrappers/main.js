"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.watch = void 0;
const product_1 = __importDefault(require("../models/product"));
const alt_1 = require("./alt");
const telegram_1 = require("../utils/telegram");
const helpers_1 = require("../utils/helpers");
function splitArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}
const watch = async () => {
    var _a, _b, _c;
    const date = new Date();
    console.log(`This task is running every minute - ${date.getHours()}:${date.getMinutes()}`);
    console.time('timer');
    // get all products that are active
    const p = await product_1.default.find({ status: 1 }).populate('owner');
    const products = splitArray(p, 50);
    const promises = [];
    const fetchedScannedProducts = [];
    for (const productsArr of products) {
        for (const product of productsArr) {
            const pricePromise = (0, alt_1.altScrapper)(product.url, product.website);
            const scannedProductPromise = pricePromise.then(price => {
                return {
                    productId: product._id,
                    price: price
                };
            });
            promises.push(scannedProductPromise);
            await (0, helpers_1.delay)(1000);
        }
        const data = await Promise.all(promises);
        fetchedScannedProducts.push(...data);
        await (0, helpers_1.delay)(2000);
    }
    // initiate a promise for each product
    // const scannedProducts: Promise<IScannedProduct>[] = [];
    // for (const product of products) {
    //   const pricePromise = altScrapper(product.url, product.website);
    //   const scannedProductPromise = pricePromise.then(price => {
    //     return {
    //       productId: product._id,
    //       price: price as number
    //     };
    //   });
    //   scannedProducts.push(scannedProductPromise);
    // }
    // // wait for all promises to resolve
    // const fetchedScannedProducts = await Promise.all(scannedProducts);
    // create a map of products for easy access to product data in O(1)
    const productsMap = new Map();
    for (const product of p) {
        productsMap.set(product._id, product);
    }
    // compare the prices and send a message if the price is lower than the previous price
    for (const el of fetchedScannedProducts) {
        if ((el === null || el === void 0 ? void 0 : el.price) && (el === null || el === void 0 ? void 0 : el.price) <= ((_a = productsMap.get(el.productId)) === null || _a === void 0 ? void 0 : _a.price)) {
            const product = productsMap.get(el.productId);
            (0, telegram_1.sendTelegramMessage)((_b = product === null || product === void 0 ? void 0 : product.owner) === null || _b === void 0 ? void 0 : _b.telegramToken, (_c = product === null || product === void 0 ? void 0 : product.owner) === null || _c === void 0 ? void 0 : _c.telegramChatId, {
                currentPrice: el.price,
                previousPrice: product === null || product === void 0 ? void 0 : product.price,
                url: product === null || product === void 0 ? void 0 : product.url
            });
        }
        (0, helpers_1.delay)(50);
    }
    console.timeEnd('timer');
    console.log('errors', alt_1.errors);
    (0, alt_1.resetErrors)();
    // delay(10000).then(() => watch())
};
exports.watch = watch;
//25
