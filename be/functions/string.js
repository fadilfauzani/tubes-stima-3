var { KMPSearch } = require("./kmp.js");
var { bya } = require("./bya.js");
function str_compare(str1, str2) {
   if (KMPSearch(str1, str2) > -1) {
      return true;
   } else {
      return false;
   }
}
module.exports = { str_compare };
//test
// var str1 = "ABABDABACDABABCABAB";
// var str2 = "ABABCABAB";
// console.log(str_compare(str2, str1));
