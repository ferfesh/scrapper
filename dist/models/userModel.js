"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    activeProductsLimit: {
        type: Number,
        default: 100,
        required: true,
        min: 1,
    },
    telegramToken: {
        type: String,
        trim: true,
    },
    telegramChatId: {
        type: [String],
        trim: true,
        maxlength: 3
    },
    status: {
        type: Number,
        default: 1,
        enum: [0, 1],
    },
    tokens: [{
            type: String,
            required: true
        }],
    resetLink: {
        type: String,
        default: ''
    }
}, { timestamps: true });
userSchema.methods.toJSON = function () {
    const user = this;
    const userObj = user.toObject();
    delete userObj.password;
    return userObj;
};
const User = (0, mongoose_1.model)('users', userSchema);
exports.default = User;
