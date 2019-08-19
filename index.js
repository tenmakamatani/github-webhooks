"use strict";

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

// body-parserでPOSTリクエストを処理
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// express-github-webhook導入
const expressGithubWebhook = require("express-github-webhook");
const webhookHandler = expressGithubWebhook({ path: "/post", secret: "secret" });
app.use(webhookHandler);

webhookHandler.on("event", (repo, data) => {
    console.log(`repogitory: ${repo}`);
    console.log(data);
});