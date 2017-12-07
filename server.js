import express from "express";
import consign from "consign";

const app = express();
//-- consign utilizado para estruturar o projeto, pega arquivos .js e injeta no app;
consign()
    .include("db.js")
    .then("libs/middlewares.js")
    .then("routes")
    .then("libs/boot.js")
    .into(app);

module.exports = app;