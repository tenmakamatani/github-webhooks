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
        res.end("no such location");
    });
}).listen(PORT);

handler.on("error", (err) => {
    console.error("Error: ", err.message);
});

handler.on("push", (event) => {
    const payload = event.payload;
    console.log(payload.commits);
});