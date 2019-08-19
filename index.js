"use strict";

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

app.post("/post", (req, res) => {
    console.log(req);
});

app.listen(PORT, () => {
    onsole.log(`Listening on PORT ${PORT}`);
});