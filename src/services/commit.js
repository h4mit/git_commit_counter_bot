// example `CompanyName #time 5h 30m commit message`

exports.parseCommit = (line) => {
  try {
    console.log(line);
    var re = /((\w*) #time)( (\d+)h)?( (\d+)m)?( (.*))/m;
    var match = re.exec(line);
    if (!match[2] || !match[4] || !match[7]) {
      return null;
    }
    return {
      company: match[2].toUpperCase(),
      time: {
        h: match[4],
        m: match[6] || 0,
      },
      message: match[7],
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};

// example `get CompanyName total time`

exports.parseTotalCompany = (line) => {
  try {
    var re = /(get (\w*) total time)/m;
    var match = re.exec(line);
    if (!match[2]) {
      return null;
    }
    return match[2].toUpperCase();
  } catch (err) {
    console.log(err);
    return null;
  }
};

// example `reset CompanyName`

exports.parseResetCompany = (line) => {
  try {
    var re = /(reset (\w*))/m;
    var match = re.exec(line);
    if (!match[2]) {
      return null;
    }
    return match[2].toUpperCase();
  } catch (err) {
    console.log(err);
    return null;
  }
};

// example `report CompanyName`

exports.parseReportCompany = (line) => {
  try {
    var re = /(report (\w*))/m;
    var match = re.exec(line);
    if (!match[2]) {
      return null;
    }
    return match[2].toUpperCase();
  } catch (err) {
    console.log(err);
    return null;
  }
};

// module.exports = {
//   parseReportCompany,
//   parseResetCompany,
//   parseTotalCompany,
//   parseCommit,
// };
