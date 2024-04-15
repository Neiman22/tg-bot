import TelegramApi from 'node-telegram-bot-api';

const token = '7074560451:AAFW01fuawQPiP5jaxu02lwcRcQSQMTphEU';

const bot = new TelegramApi(token, { polling: true });

bot.on('message', msg => {
  const text = msg.text;
  const chatId = msg.chat.id;

  if (text === '/start') {
    bot.sendMessage(chatId, `Добро пожаловать`);
  }

  if (text === '/info') bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`);
  bot.sendMessage(chatId, `Ты написал мне: ${text}`);
})