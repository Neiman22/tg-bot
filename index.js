import TelegramApi from 'node-telegram-bot-api';

const token = '7074560451:AAFW01fuawQPiP5jaxu02lwcRcQSQMTphEU';

const bot = new TelegramApi(token, { polling: true });

const chats = {};

const gameOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'}],
      [{text: '4', callback_data: '4'}, {text: '5', callback_data: '5'}, {text: '6', callback_data: '6'}],
      [{text: '7', callback_data: '7'}, {text: '8', callback_data: '8'}, {text: '9', callback_data: '9'}],
      [{text: '0', callback_data: '0'}]
    ]
  })
};

const start = () => {
  bot.setMyCommands([
    {command: '/start', description: 'Начальное приветствие'},
    {command: '/info', description: 'Информация о пользователе'},
    {command: '/game', description: 'Игра'}
  ])
  
  bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;
  
    if (text === '/start') {
      await bot.sendMessage(chatId, `Добро пожаловать`);
      return bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/8a1/9aa/8a19aab4-98c0-37cb-a3d4-491cb94d7e12/2.webp');
    }
    if (text === '/info') {
      return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`);
    }
    if (text === '/game') {
      await bot.sendMessage(chatId, 'Отгадай число');
      const randomNumber = Math.floor(Math.random() * 10);
      chats[chatId] = randomNumber;
      return bot.sendMessage(chatId, 'Отгадай', gameOptions);
    }
    return bot.sendMessage(chatId, `Неверная команда`);
  })

  bot.on('callback_query', async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id

    if (data == chats[chatId]) {
      await bot.sendMessage(chatId, `Ты угадал!!!`);
    } else {
      await bot.sendMessage(chatId, `Цифра ${data} не верна ${chats[chatId]}`);
    }
    
  })
}
start();
