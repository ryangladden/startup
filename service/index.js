const express = require('express')
const app = express();
const bcyrpt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');

app.use(express.json());
app.use(cookieParser());

app.get("/soup", (req, res) => {
    res.send("joe MAMA" + req.cookies)
})

app.listen(3000);