import moment from "moment";

global.url = "http://localhost:3000";
global.layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

global.customSort = (a, b) => {
  if (a > b) return 1;
  if (b > a) return -1;
  return 0;
};

global.checkNumber = (rule, value) => {
  if (!isNaN(value)) {
    return Promise.resolve();
  }
  return Promise.reject("Please enter a number!");
};

global.changeUtcToLocal = (date) => {
  if (typeof date === "undefined") return undefined;
  var dateUTC = moment.utc(new Date(date)).format();
  var localDate = moment.utc(dateUTC).local().format("YYYY-MM-DD HH:mm:ss");
  return localDate;
};

global.validateMessages = {
  required: "This field is required!",
};
