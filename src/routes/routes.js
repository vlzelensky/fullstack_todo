const express = require("express");
const app = express();
const path = require('path');

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../', "index.html"));
})

app.listen(8080);