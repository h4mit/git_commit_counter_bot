const fs = require("fs");
const readline = require("readline");
const path = require("path");

exports.reportLogs = async (company, msg, bot) => {
  const appDir = path.dirname(require.main.filename);
  const filepath = `${appDir}/${company}.txt`;
  const fileStream = fs.createReadStream(filepath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    if (line) {
      bot.sendMessage(msg.chat.id, `${line}`);
    }
  }
};
