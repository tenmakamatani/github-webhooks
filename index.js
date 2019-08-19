"use strict";

const http = require("http");
const PORT = process.env.PORT || 8000;
const REPOSITORY_NAME = "github-webhooks";

// github-webhook-handler導入
const createHandler = require("github-webhook-handler");
const handler = createHandler({
    path: "/post",
    secret: process.env.SECRET_KEY
});

http.createServer((req, res) => {
    handler(req, res, (err) => {
        res.statusCode = 404;
        res.end("No such location");
    });
}).listen(PORT);

handler.on("error", (err) => {
    console.error("Error: ", err.message);
});

handler.on("push", (event) => {
    const payload = event.payload;
    let message = payload.repository.name + " レポジトリにpushされました。\n";
    for (let i = 0; i < payload.commits.length; i++) {
        message = message + "Commit: " + payload.commits[i].message + " by " + payload.commits[i].committer.name + "\n";
    }
    message = message + "URL: " + payload.repository.url;
    console.log(message);
});