"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTelegramMessage = void 0;
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const sendTelegramMessage = async (token, chatId, messageData) => {
    try {
        const bot = new node_telegram_bot_api_1.default(token);
        const message = `تم تغير سعر المنتج 
    \n السعر الحالي: ${messageData.currentPrice}
    \n سعر المراقبة: ${messageData.previousPrice}
    \n ${messageData.url}`;
        chatId === null || chatId === void 0 ? void 0 : chatId.forEach(id => {
            bot.sendMessage(id, message);
        });
    }
    catch (e) {
        console.log(e);
    }
};
exports.sendTelegramMessage = sendTelegramMessage;
