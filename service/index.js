const port = process.argv.length > 2 ? process.argv[2] : 4000;

const express = require('express')
const app = express();
const cookieParser = require('cookie-parser');
let apiRouter = express.Router();
const docs = require('./docs.json');
const auth = require("./auth")

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(`api`, apiRouter);

var users = []
var authTokens = {}

function getDateEnds(dates) {
    const converted = dates.map(date => new Date(date).getFullYear())
    return [Math.min(...converted), Math.max(...converted)]
}

function createFilter() {
    var authors = [];
    var dates = [];
    for (const card of docs) {
        if (!authors.includes(card.author)) {
        authors.push(card.author);
        }
        dates.push(card.date)
    }
    return {authors: authors,
            dates: getDateEnds(dates)};
}



function filtered(cards, filter) {
    var filtered = [];
    for (const card of cards) {
        const year = new Date(card.date).getFullYear();
        if (filter.authors.includes(card.author) &&
        year >= filter.dates[0] && year <= filter.dates[1])
        filtered.push(card);
    }
    return filtered;
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
        console.log(users);
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
        auth.setAuthCookie(res, token);
        authTokens[token] = email;
        res.send({email: email, name: auth.getUser("email", email, users).name});
    } catch(error) {
        res.send("Error: " + error);
    }
});

app.delete("/api/session", async (req, res) => {
    if (auth.authenticate(token, authTokens)) {
        delete authTokens[token];
        res.status(200).send({});
    }
    else {
        res.status(400).send("Error: unauthorized");
    }
})

app.post("/api/docs/list", (req, res) => {
    try {
        if (!req.body.filter) {
            // res.send("You made it");
            res.send(JSON.stringify(docs));
        }
        else {
            (res.send(JSON.stringify(filtered(docs, req.body.filter))));
        }
    } catch(error) {
        res.send("Uh oh" + error);
    }
})

app.get("/api/docs/filter", (req, res) => {
    res.send(JSON.stringify(createFilter()));
})

app.listen(port);
console.log("Listening on port " + port + "!");