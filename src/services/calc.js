const fs = require("fs");
const readline = require("readline");
const path = require("path");

exports.calculateWorkLog = async (company) => {
  try {
    const appDir = path.dirname(require.main.filename);
    const filepath = `${appDir}/${company}.txt`;
    const fileStream = fs.createReadStream(filepath);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    let hour = 0;
    let minute = 0;

    for await (const line of rl) {
      if (line) {
        const [message, time] = line.split("-");
        const [h, m] = time.split(":");
        hour += parseInt(h);
        minute += parseInt(m);
      }
    }
    hour += Math.floor(minute / 60);
    return `${hour}:${minute % 60}`;
  } catch (error) {
    console.log(error);
    return `Error calculate total WorkLog`;
  }
};
