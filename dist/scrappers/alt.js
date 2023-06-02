"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.altScrapper = exports.resetErrors = exports.errors = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = require("cheerio");
const helpers_1 = require("../utils/helpers");
exports.errors = 0;
const MAX_RETRIES = 3; // Maximum number of retries
const resetErrors = () => {
    exports.errors = 0;
};
exports.resetErrors = resetErrors;
const altScrapper = async (url, selector) => {
    let retries = 0;
    while (retries < MAX_RETRIES) {
        try {
            // const { data } = await axiosInstance.get(url);
            const { data } = await axios_1.default.get(url, {
                timeout: 10000,
            });
            const $ = (0, cheerio_1.load)(data);
            let result = -1;
            switch (selector) {
                case 'Amazon':
                    result = (0, helpers_1.extractNumbersFromString)($('.a-price-whole').first().text().trim());
                    break;
                case 'Noon':
                    result = (0, helpers_1.extractNumbersFromString)($('.priceNow').first().text().trim());
                    break;
                // case 'Jumia':
                //   result = extractNumbersFromString($('.-b.-ltr.-tal.-fs24').first().text().trim());
                //   break;
                // case 'hatly':
                //   result = extractNumbersFromString($('.price').first().text().trim());
                //   break;
            }
            // console.log(result)
            return result;
        }
        catch (e) {
            console.log(e.message);
            retries++;
            (0, helpers_1.delay)(1000);
        }
    }
    exports.errors++;
};
exports.altScrapper = altScrapper;
