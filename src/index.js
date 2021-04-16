"use strict";

import TelegramBot from "node-telegram-bot-api";
// const TelegramBot = require('node-telegram-bot-api');

import dotenv from "dotenv";
dotenv.config();

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
  const bye = "bye";
  if (msg.text.toString().toLowerCase().includes(bye)) {
    bot.sendMessage(
      msg.chat.id,
      "Have a nice day " + msg.from.first_name + msg.from.last_name
    );
  }
});
