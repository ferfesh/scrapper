"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.altScrapper = exports.resetRequests = exports.resetErrors = exports.REQUESTS = exports.errors = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = require("cheerio");
const helpers_1 = require("../utils/helpers");
exports.errors = 0;
const MAX_RETRIES = 3; // Maximum number of retries
exports.REQUESTS = 0;
const resetErrors = () => {
    exports.errors = 0;
};
exports.resetErrors = resetErrors;
const resetRequests = () => {
    exports.REQUESTS = 0;
};
exports.resetRequests = resetRequests;
const altScrapper = async (url, selector) => {
    let retries = 0;
    while (retries < MAX_RETRIES) {
        try {
            exports.REQUESTS++;
            // const { data } = await axiosInstance.get(url);
            const { data } = await axios_1.default.get(url, {
                timeout: 10000,
            });
            const $ = (0, cheerio_1.load)(data);
            let result = NaN;
            if (selector === 'Amazon') {
                const checkIfNotExists = $('#availability .a-size-medium.a-color-price').length > 0;
                if (checkIfNotExists)
                    return result;
            }
            switch (selector) {
                case 'Amazon':
                    result = (0, helpers_1.extractNumbersFromString)($('.celwidget .a-section.a-spacing-none.aok-align-center .a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay .a-price-whole').first().text().trim());
                    break;
                case 'Noon':
                    result = (0, helpers_1.extractNumbersFromString)($('.priceNow').first().text().trim());
                    break;
            }
            // console.log(result)
            return result;
        }
        catch (e) {
            console.log(e.message);
            retries++;
            (0, helpers_1.delay)(1500);
        }
    }
    exports.errors++;
};
exports.altScrapper = altScrapper;
