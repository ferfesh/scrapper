"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = exports.extractNumbersFromString = void 0;
const extractNumbersFromString = (str) => {
    const regex = /\d+(\.\d+)?/g;
    const matches = str.replace(',', '').match(regex);
    if (matches && matches.length > 0) {
        return parseFloat(matches[0]);
    }
    return NaN;
};
exports.extractNumbersFromString = extractNumbersFromString;
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
exports.delay = delay;
