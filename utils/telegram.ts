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
    chatId.forEach(id => {
      bot.sendMessage(id, message);
    })
  } catch (e) {
    console.log(e)
  }

}
