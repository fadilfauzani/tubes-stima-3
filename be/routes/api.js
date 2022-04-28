var express = require("express");
var router = express.Router();
var { client: client } = require("./database.js");
var { getNamaPenyakit, getRantai } = require("../functions/getter.js");
var { str_compare } = require("../functions/string.js");
const { isDNAValid } = require("../functions/regex.js");
/* GET users listing. */
router.get("/penyakit", function (req, res, next) {
   client.query("SELECT * FROM penyakit", (errp, resp) => {
      if (!errp) {
         res.send(resp);
      } else {
         res.send(errp);
      }
   });
});
router.post("/penyakit", function (req, res, next) {
   if (isDNAValid(req.body.textPenyakit)) {
      client.query("INSERT INTO penyakit (nama, rantai) VALUES ('" + req.body.Name + "', '" + req.body.textPenyakit + "')", (err, resp) => {
         if (!err) {
            res.send({ type: "Berhasil", success: true });
         } else {
            res.send(err);
         }
      });
   } else {
      res.send({ type: "Invalid DNA", success: false });
   }
});
router.get("/penyakit-hist", function (req, res, next) {
   client.query("SELECT id, nama_pengguna, CONCAT(date_part('day', tanggal_test), ' ', TRIM(TO_CHAR(tanggal_test, 'Month')), ' ', date_part('year', tanggal_test)) as tanggal_test, nama_penyakit, hasil FROM history_dna", (errp, resp) => {
      if (!errp) {
         res.send(resp);
      } else {
         res.send(errp);
      }
   });
});
router.post("/penyakit-hist", function (req, res, next) {
   var namapenyakit, rantai, hasil;
   // console.log(req.body.textDNA, isDNAValid(req.body.textDNA));
   if (isDNAValid(req.body.textDNA)) {
      Promise.all([getNamaPenyakit(req.body.idPenyakit), getRantai(req.body.idPenyakit)]).then((data) => {
         namapenyakit = data[0];
         rantai = data[1];
         // console.log(rantai);
         hasil = str_compare(req.body.textDNA, rantai);
         // console.log(req.body.Name + " " + namapenyakit + " " + hasil);
         client.query("INSERT INTO history_dna (nama_pengguna, nama_penyakit, hasil) VALUES ('" + req.body.Name + "', '" + namapenyakit + "', '" + hasil + "')", (err, resp) => {
            if (!err) {
               // console.log(resp);
               res.send({ type: "Berhasil", success: true, nama: req.body.Name, penyakit: namapenyakit, hasil: hasil });
            } else {
               res.send(err);
            }
         });
      });
   } else {
      res.send({ type: "Invalid DNA", success: false });
   }
});
module.exports = router;
