"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const mongoose_1 = require("mongoose");
const requestSchema = new mongoose_1.Schema({
    requests: {
        type: Number,
        required: true,
    },
    products: {
        type: Number,
        required: true,
    },
    failed: {
        type: Number,
        default: 0
    },
    success: {
        type: Number,
        default: 0
    },
    batch: {
        type: Number,
        default: 0
    }
}, { timestamps: true });
exports.Request = (0, mongoose_1.model)("Request", requestSchema);
