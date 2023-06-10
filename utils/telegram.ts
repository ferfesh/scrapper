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
  try {
    const bot = new TelegramBot(token);
    const message = `تم تغير سعر المنتج 
    \n السعر الحالي: ${messageData.currentPrice}
    \n سعر المراقبة: ${messageData.previousPrice}
    \n ${messageData.url}`;
    chatId?.forEach(id => {
      bot.sendMessage(id, message);
    })
  } catch (e) {
    console.log(e)
  }

}

export const sendTelegramStats = async (
  token: string,
  chatId: string,
  stats: {
    batch: number;
    time: string;
    products: number;
    requests: number;
    errors: number;
    success: number;
  }
) => {
  try {
    const bot = new TelegramBot(token);
    const message = `Current Stats:
    \n Batch: ${stats.batch}
    \n Time: ${stats.time}
    \n Products: ${stats.products}
    \n Requests: ${stats.requests}
    \n Success: ${stats.success}
    \n Errors: ${stats.errors}`;
    bot.sendMessage(chatId, message);
  } catch (e) {
    console.log(e)
  }
}