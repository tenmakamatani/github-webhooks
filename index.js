"use strict";

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

// body-parserでPOSTリクエストを処理
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/post", (req, res) => {
    console.log(req.body);
});

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});