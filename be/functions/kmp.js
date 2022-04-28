function KMPSearch(pat, txt) {
   var M = pat.length;
   var N = txt.length;
   var i = 0;
   var j = 0;
   var lps = new Array(M);
   computeLPSArray(pat, M, lps);
   while (i < N) {
      if (pat[j] == txt[i]) {
         j++;
         i++;
      }
      if (j == M) {
         return i - j + 1;
      } else if (i < N && pat[j] != txt[i]) {
         if (j != 0) j = lps[j - 1];
         else i = i + 1;
      }
   }
   return -1; // not found
}
function computeLPSArray(pat, M, lps) {
   var len = 0;
   var i = 1;
   lps[0] = 0;
   while (i < M) {
      if (pat[i] == pat[len]) {
         len++;
         lps[i] = len;
         i++;
      } else {
         if (len != 0) {
            len = lps[len - 1];
         } else {
            lps[i] = 0;
            i++;
         }
      }
   }
}
//Test KMP
// var txt = "ABABDABACDABABCABAB";
// var pat = "ABABCABAB";
// var count = KMPSearch(pat, txt);
// console.log("Number of occurences of pattern in text: " + count);

module.exports = { KMPSearch };
