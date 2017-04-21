var logEntries = []
var Logger = function () { }
Logger.prototype.add = function (desc) {
  // included elapsed time difference from previous log entry.
  var prev = logEntries.length - 1
  var elapsed = 0
  var now = new Date()
  if (logEntries.length > 0) {
    elapsed = (now - logEntries[prev].sytemdatetime)
    if (desc.indexOf('- End') > -1) {
      desc = desc + ' [' + elapsed + ' ms]'
    }
  }
  // Add log entry.
  var logEntry = { datetime: getDateTime(now), description: desc, sytemdatetime: now, difference: elapsed }
  logEntries.push(logEntry)
}
Logger.prototype.getLog = function () {
  return logEntries
}
module.exports = new Logger()

function getDateTime (now) {
  var year = now.getFullYear()
  var month = now.getMonth() + 1
  var day = now.getDate()
  var hour = now.getHours()
  var minute = now.getMinutes()
  var second = now.getSeconds()
  var ms = now.getMilliseconds()
  if (month.toString().length === 1) {
    month = '0' + month
  }
  if (day.toString().length === 1) {
    day = '0' + day
  }
  if (hour.toString().length === 1) {
    hour = '0' + hour
  }
  if (minute.toString().length === 1) {
    minute = '0' + minute
  }
  if (second.toString().length === 1) {
    second = '0' + second
  }
  if (ms.toString().length === 1) {
    ms = '00' + ms
  }
  if (ms.toString().length === 2) {
    ms = '0' + ms
  }
  var dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second + '.' + ms
  return dateTime
}
