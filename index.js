"use strict";

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

// body-parserでPOSTリクエストを処理
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 普通にアクセスされた時はwelcomeと表示する
app.get("/", (req, res) => {
    res.send("welcome");
});

app.post("/post", (req, res) => {
    console.log(req.payload);
});

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});