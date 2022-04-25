var express = require("express");
var router = express.Router();
var { client: client } = require("./database.js");
var { getNamaPenyakit, getRantai } = require("../functions/getter.js");
var { str_compare } = require("../functions/string.js");
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
   console.log(req.body);
   res.send(req.body);
   client.query("INSERT INTO penyakit (nama, rantai) VALUES ('" + req.body.Name + "', '" + req.body.textPenyakit + "')", (err, resp) => {
      if (!err) {
         res.send(resp);
      } else {
         res.send(err);
      }
   });
});
router.get("/penyakit-hist", function (req, res, next) {
   client.query("SELECT nama_pengguna, CONCAT(date_part('day', tanggal_test), '-', TRIM(TO_CHAR(tanggal_test, 'Month')), '-', date_part('year', tanggal_test)) as tanggal_test, nama_penyakit, hasil FROM history_dna", (errp, resp) => {
      if (!errp) {
         res.send(resp);
      } else {
         res.send(errp);
      }
   });
});
router.post("/penyakit-hist", function (req, res, next) {
   console.log(req.body);
   var namapenyakit, rantai, hasil;
   Promise.all([getNamaPenyakit(req.body.idPenyakit), getRantai(req.body.idPenyakit)]).then((data) => {
      namapenyakit = data[0];
      rantai = data[1];
      console.log(rantai);
      hasil = str_compare(req.body.textPenyakit, rantai);
      // console.log(req.body.Name + " " + namapenyakit + " " + hasil);
      client.query("INSERT INTO history_dna (nama_pengguna, nama_penyakit, hasil) VALUES ('" + req.body.Name + "', '" + namapenyakit + "', '" + hasil + "')", (err, resp) => {
         if (!err) {
            res.send(resp);
         } else {
            res.send(err);
         }
      });
   });
});
module.exports = router;
