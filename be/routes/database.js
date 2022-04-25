const { Client } = require("pg");
var express = require("express");
var router = express.Router();

const client = new Client({
   user: "postgres",
   host: "localhost",
   database: "data_stima",
   password: "asdfgh",
   port: 5432,
});
client.connect();

module.exports = { client };
