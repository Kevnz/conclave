
module.exports = function timestampGenerator() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() > 8 ? (now.getMonth() + 1).toString() : `0${(now.getMonth() + 1)}`;
  const day = now.getDate() > 9 ? now.getDate().toString() : `0${now.getDate()}`;
  const hour = now.getHours() > 8 ? (now.getHours() + 1).toString() : `0${(now.getHours() + 1)}`;
  const minutes = now.getMinutes() > 8 ? (now.getMinutes() + 1).toString() : `0${(now.getMinutes() + 1)}`;
  const seconds = now.getMinutes() > 8 ? (now.getMinutes() + 1).toString() : `0${(now.getMinutes() + 1)}`;
  const milliseconds = now.getMilliseconds() > 8 ? (now.getMilliseconds() + 1).toString() : `0${(now.getMilliseconds() + 1)}`;
  const timestamp = `${year}${month}${day}${hour}${minutes}${seconds}${milliseconds}`;
  return timestamp;
};
