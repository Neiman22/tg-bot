import TelegramApi from 'node-telegram-bot-api';

const token = '7074560451:AAFW01fuawQPiP5jaxu02lwcRcQSQMTphEU';

const bot = new TelegramApi(token, { polling: true });

bot.on('message', async msg => {
  const text = msg.text;
  const chatId = msg.chat.id;

  if (text === '/start') await bot.sendMessage(chatId, `Добро пожаловать`);
  if (text === '/info') {
    await bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`);
    await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/8a1/9aa/8a19aab4-98c0-37cb-a3d4-491cb94d7e12/2.webp');
  }
  //bot.sendMessage(chatId, `Ты написал мне: ${text}`);
})