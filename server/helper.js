const moment = require("moment");

exports.changeUtcToLocal = (date) => {
  if (typeof date === "undefined") return undefined;
  var dateUTC = moment.utc(new Date(date)).format();
  var localDate = moment.utc(dateUTC).local().format("YYYY-MM-DD HH:mm:ss");
  return localDate;
};