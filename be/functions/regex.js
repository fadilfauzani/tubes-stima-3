var DNA_re = new RegExp("^[A|T|C|G]*$");
var Date_re = new RegExp("[0-9]{1,2}\\s*[A-Z|a-z]{1,}\\s*[0-9]{1,}");
function isDNAValid(txt) {
   return DNA_re.test(txt);
}
function takeDate(text) {
   console.log("text", text);
   return Date_re.exec(text) ? Date_re.exec(text)[0] : null;
}
// console.log(takeDate("29 september 2002"));
module.exports = { isDNAValid, takeDate };
