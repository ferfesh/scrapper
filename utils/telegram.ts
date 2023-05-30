import TelegramBot from 'node-telegram-bot-api';


interface ITelegramMessageData {
  currentPrice: number;
  previousPrice: number;
  url: string;
}

export const sendTelegramMessage = async (
  token: string,
  chatId: string[],
  messageData: ITelegramMessageData
) => {
  const bot = new TelegramBot('6226231226:AAEQbySbEYIjcay2WqeNhKvbC8sM-9xz30g');

  const message = `تم تغير سعر المنتج 
  \n السعر الحالي: ${messageData.currentPrice}
  \n سعر المراقبة: ${messageData.previousPrice}
  \n ${messageData.url}`;
  bot.sendMessage(2026902039, message);
}
