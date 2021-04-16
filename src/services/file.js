const fs = require("fs");
const path = require("path");

exports.appendCommit = (companyName, commit, hour, minute) => {
  try {
    const appDir = path.dirname(require.main.filename);
    const filepath = `${appDir}/${companyName}.txt`;

    console.log(filepath);
    fs.appendFileSync(filepath, `${commit}-${hour}:${minute}\n`);
    return "Submitted Commit";
  } catch (err) {
    console.error(err);
    return "Uncorrect Submmited! :(";
  }
};

exports.existCompany = (company) => {
  try {
    const appDir = path.dirname(require.main.filename);
    const filepath = `${appDir}/${company}.txt`;
    if (fs.existsSync(filepath)) {
      return true;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

exports.backupCompany = (company) => {
  try {
    const appDir = path.dirname(require.main.filename);
    const filepath = `${appDir}/${company}.txt`;
    const backupFilePath = `${appDir}/${company}-${Date.now()}.txt`;
    fs.renameSync(filepath, backupFilePath);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
