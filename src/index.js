const TelegramBot = require("node-telegram-bot-api");
const { calculateWorkLog } = require("./services/calc");
const {
  parseCommit,
  parseReportCompany,
  parseTotalCompany,
  parseResetCompany,
} = require("./services/commit");
const { appendCommit, backupCompany } = require("./services/file");
const { reportLogs } = require("./services/report");
require("dotenv").config();

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  console.log(msg);
  const time = "#time";
  const total = "total";
  const reset = "reset";
  const report = "report";
  if (msg.text.toString().toLowerCase().includes(total)) {
    const company = parseTotalCompany(msg.text.toString().toLowerCase());
    if (company) {
      const totalTime = await calculateWorkLog(
        `file_${msg.from.id}_${msg.chat.id}_${company}`
      );
      bot.sendMessage(msg.chat.id, `company ${company} : ${totalTime}`);
    } else {
      bot.sendMessage(msg.chat.id, `bad syntax!`);
    }
  } else if (msg.text.toString().toLowerCase().includes(reset)) {
    const company = parseResetCompany(msg.text.toString().toLowerCase());
    if (company) {
      const backup = backupCompany(
        `file_${msg.from.id}_${msg.chat.id}_${company}`
      );
      bot.sendMessage(
        msg.chat.id,
        backup
          ? `company ${company} has restart worklogs.`
          : `company ${company} unsuccessfully restart worklogs. :'(`
      );
    } else {
      bot.sendMessage(msg.chat.id, `bad syntax!`);
    }
  } else if (msg.text.toString().toLowerCase().includes(report)) {
    const company = parseReportCompany(msg.text.toString().toLowerCase());
    if (company) {
      reportLogs(`file_${msg.from.id}_${msg.chat.id}_${company}`, msg, bot);
    } else {
      bot.sendMessage(msg.chat.id, `bad syntax!`);
    }
  } else if (msg.text.toString().toLowerCase().includes(time)) {
    const commit = parseCommit(msg.text.toString());
    if (commit) {
      const addCommit = appendCommit(
        `file_${msg.from.id}_${msg.chat.id}_${commit.company}`,
        commit.message,
        commit.time.h,
        commit.time.m
      );

      bot.sendMessage(
        msg.chat.id,
        addCommit
          ? `Add commit in ${commit.company} company.`
          : "add unsuccessfully! :("
      );
    } else {
      bot.sendMessage(msg.chat.id, `bad syntax!`);
    }
  } else {
    bot.sendMessage(
      msg.chat.id,
      `bot not supported syntax! \n # ADD new work log \n CompanyName #time 5h 30m commit message\n# Get Total worklog Time\nget CompanyName total time\n# Restart and Backup worklog\nreset CompanyName\n# Report worklog\nreport CompanyName`
    );
  }
});
