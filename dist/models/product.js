"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userModel_1 = __importDefault(require("./userModel"));
const productSchema = new mongoose_1.Schema({
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: userModel_1.default,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        maxLength: [8, "Price cannot exceed 8 characters"],
    },
    url: {
        type: String,
        required: true,
        trim: true
    },
    website: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 1,
    },
}, { timestamps: true });
const Product = (0, mongoose_1.model)('products', productSchema);
exports.default = Product;
