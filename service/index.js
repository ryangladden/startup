const port = process.argv.length > 2 ? process.argv[2] : 4000;

const express = require('express')
const app = express();
const cookieParser = require('cookie-parser');
let apiRouter = express.Router();
const cards = require('./docs.json');
const auth = require("./auth")
const docs = require("./docs")

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(`api`, apiRouter);

var users = [{
    name: 'Ryan Gladden',
    email: 'ryan@gladdenfamily.org',
    password: '$2b$10$FFTxY0yfoljG0GkWM9Trsegb9ZX8g1lhQUU6.W6Pq6tF3V2xcwpS.'
}]
var authTokens = {
    'd3854aa3-3b17-4003-86a0-e60b2da1c4c3': 'ryan@gladdenfamily.org',
    '9afe7c5d-9c10-486f-b518-7225730a634c': 'ryan@gladdenfamily.org'
}


app.get("/api/soup", (req, res) => {
    res.send("joe MAMA")
})

app.get("/api/user", (req, res) => {
    const token = req.cookies.token;
    if (auth.authenticate(token, authTokens)) {
        const user = auth.getUser("email", authTokens[token], users)
        res.send({email: user.email, name: user.name});
    }
    res.status(403).send("Error: unauthorized\n");
})

app.post("/api/user", async (req, res) => {
    try {
        const { email, name, password } = req.body;
        users.push(await auth.createUser(email, name, password, users));
        const token = await auth.login(email, password, users);
        console.log(token);
        authTokens[token] = email;
        auth.setAuthCookie(res, token);
        res.send({email: email, name: name});
    } catch(error) {
    res.status(404).send(error);
    }
});

app.post("/api/session", async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await auth.login(email, password, users);
        console.log(token);
        auth.setAuthCookie(res, token);
        authTokens[token] = email;
        res.send({email: email, name: auth.getUser("email", email, users).name});
    } catch(error) {
        res.status(403).send("Error: " + error);
    }
});

app.get("/api/session", async (req, res) => {
    const authToken = req.cookies.token;
    res.send({authenticated: auth.authenticate(authToken, authTokens)})
})

app.delete("/api/session", async (req, res) => {
    const authToken = req.cookies.token;
    if (auth.authenticate(authToken, authTokens)) {
        delete authTokens[authToken];
        res.clearCookie('token')
        res.status(200).send({});
    }
    else {
        res.status(400).send("Error: unauthorized");
    }
})

app.get("/api/docs/list", (req, res) => {
    const newCards = docs.filter(cards, req.query);
    console.log(req.query)
    try {
        res.send(newCards);
    } catch(error) {
        res.send("Uh oh" + error);
    }
})

app.get("/api/docs/filter", (req, res) => {
    res.send(docs.createFilter(cards));
})

app.listen(port);
console.log("Listening on port " + port + "!");