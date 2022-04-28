function last(pattern) {
   var l = new Array(128);
   for (let i = 0; i < 128; i++) {
      l[i] = -1;
   }
   for (let i = 0; i < pattern.length; i++) {
      l[pattern.charCodeAt(i)] = i;
   }
   return l;
}
function bya(pattern, txt) {
   var lastTable = last(pattern);
   console.log(lastTable);
   var M = pat.length;
   var N = txt.length;
   var i = M - 1;

   if (i > N - 1) {
      return -1;
   }
   var j = M - 1;
   while (i < N) {
      console.log(i, j);
      if (pat[j] == txt[i]) {
         if (j == 0) {
            console.log(i);
            return i;
         }
         i--;
         j--;
      } else {
         var index = lastTable[txt.charCodeAt(i)];
         i = i + M - Math.min(j, 1 + index);
         j = M - 1;
      }
   }
}
//test
// var txt = "ABABDABACDABABCABAB";
// var pat = "ABABCABAB";
// var count = bya(pat, txt);
// console.log("Number of occurences of pattern in text: " + count);
module.exports = { bya };
