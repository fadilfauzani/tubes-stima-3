var { client: client } = require("../routes/database.js");

function getNamaPenyakit(id) {
   return new Promise((resolve, reject) => {
      client.query("SELECT nama FROM penyakit WHERE id = " + id, (err, resp) => {
         if (!err) {
            resolve(resp.rows[0].nama);
         } else {
            reject(err);
         }
      });
   });
}
function getRantai(id) {
   return new Promise((resolve, reject) => {
      client.query("SELECT rantai FROM penyakit WHERE id = " + id, (err, resp) => {
         if (!err) {
            resolve(resp.rows[0].rantai);
         } else {
            reject(err);
         }
      });
   });
}

module.exports = { getNamaPenyakit, getRantai };
