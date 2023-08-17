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
const requests_1 = require("../models/requests");
function splitArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}
const watch = async () => {
    var _a, _b, _c;
    const batch = process.env.BATCH;
    const date = new Date();
    console.log(`This task is running every minute - ${date.getHours()}:${date.getMinutes()}`);
    console.time(`${date.getHours()}:${date.getMinutes()}`);
    // get all products that are active
    const p = await product_1.default.find({ status: 1 }).populate('owner').sort({ createdAt: -1 }).limit(100).skip((Number(batch) - 1) * 100);
    const products = splitArray(p, 20);
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
        promises.length = 0;
        await (0, helpers_1.delay)(5000);
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
            await (0, helpers_1.delay)(20);
        }
    }
    console.timeEnd(`${date.getHours()}:${date.getMinutes()}`);
    console.log('Success', p.length - alt_1.errors);
    console.log('errors', alt_1.errors);
    const requests = new requests_1.Request({
        batch,
        requests: alt_1.REQUESTS,
        products: p.length,
        failed: alt_1.errors,
        success: p.length - alt_1.errors,
    });
    await requests.save();
    (0, telegram_1.sendTelegramStats)(process.env.TELEGRAM_TOKEN, process.env.TELEGRAM_CHAT_ID, {
        batch: Number(batch),
        time: `${date.getHours()}:${date.getMinutes()}`,
        products: p.length,
        requests: alt_1.REQUESTS,
        errors: alt_1.errors,
        success: p.length - alt_1.errors,
    });
    (0, alt_1.resetErrors)();
    (0, alt_1.resetRequests)();
    (0, helpers_1.delay)(10000).then(() => (0, exports.watch)());
};
exports.watch = watch;
// export const watch = async () => {
//   const batch = process.env.BATCH as string;
//   const date = new Date();
//   console.log(`This task is running every minute - ${date.getHours()}:${date.getMinutes()}`);
//   console.time(`${date.getHours()}:${date.getMinutes()}`)
//   // get all products that are active
//   const p = await Product.find({ status: 1 }).populate('owner').sort({ createdAt: -1 }).limit(100).skip((Number(batch) - 1) * 100);
//   const products = splitArray(p, 20);
//   for (const product of p) {
//     const data = await scraper(product.url, product.website);
//   }
//   console.timeEnd(`${date.getHours()}:${date.getMinutes()}`)
// }
