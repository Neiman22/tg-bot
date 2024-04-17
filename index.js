import TelegramApi from 'node-telegram-bot-api';
import { gameOptions, againOptions } from './options.js';

const token = '7074560451:AAFW01fuawQPiP5jaxu02lwcRcQSQMTphEU';
const bot = new TelegramApi(token, { polling: true });
const chats = {};

const startGame = async (chatId) => {
  const randomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, 'Отгадай число', gameOptions);
}

const start = async () => {
  bot.setMyCommands([
    {command: '/start', description: 'Начальное приветствие'},
    {command: '/info', description: 'Информация о пользователе'},
    {command: '/game', description: 'Игра'}
  ])
  
  bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;
  
    switch (text) {
      case '/start':
        await bot.sendMessage(chatId, `Добро пожаловать`);
        return bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/8a1/9aa/8a19aab4-98c0-37cb-a3d4-491cb94d7e12/2.webp');
      case '/info':
        return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`);
      case '/game':
        return startGame(chatId);
      default:
        return bot.sendMessage(chatId, `Неверная команда`);
    }
  })

  bot.on('callback_query', async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id

    if (data === '/again') {
      return startGame(chatId);
    }

    if (data == chats[chatId]) {
      await bot.sendMessage(chatId, `Ты угадал!!!`, againOptions);
    } else {
      await bot.sendMessage(chatId, `Цифра ${data} не верна ${chats[chatId]}`, againOptions);
    }
    
  })
}
start();
