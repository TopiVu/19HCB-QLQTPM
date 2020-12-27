function parseStrToDate(date) {
  let splitDate = date.split('/');
  let month = splitDate[0];
  let day = splitDate[1];
  let year = splitDate[2];

  return new Date(year, month - 1, day);
}

function parseDateToStr(date) {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

module.exports = {
  parseDateToStr,
  parseStrToDate
}
