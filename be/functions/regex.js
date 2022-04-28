var DNA_re = new RegExp("^[A|T|C|G]*$");

function isDNAValid(txt) {
   return DNA_re.test(txt);
}
module.exports = { isDNAValid };
