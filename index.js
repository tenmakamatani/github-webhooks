"use strict";

const http = require("http");
const PORT = process.env.PORT || 8000;

// github-webhook-handler導入
const createHandler = require("github-webhook-handler");
const handler = createHandler({
    path: "/post",
    secret: process.env.SECRET_KEY
});

// nodemailer導入
const nodeMailer = require("nodemailer");
const smtpConfig = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_ADDRESS_FROM,
        pass: process.env.GOOGLE_ACCOUNT_PASSWORD
    }
};
const transporter = nodeMailer.createTransport(smtpConfig);

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

    const sendMessage = {
        from: process.env.MAIL_ADDRESS_FROM,
        to: process.env.MAIL_ADDRESS_TO,
        subject: "GitHub push通知",
        text: message
    };
    transporter.sendMail(sendMessage, (err, res) => {
        console.log(err || res);
    });
});