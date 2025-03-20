const port = process.argv.length > 2 ? process.argv[2] : 4000;

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
let apiRouter = express.Router();
const cards = require('./docs.json');
const auth = require("./auth");
const docs = require("./docs");
const db = require("./db");
const s3 = require("./s3");
const paths = require("./paths.json");
const path = require("path");



app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(`/api`, apiRouter);

// var id = 51;

// var users = [{
//     name: 'Ryan Gladden',
//     email: 'ryan@gladdenfamily.org',
//     password: '$2b$10$FFTxY0yfoljG0GkWM9Trsegb9ZX8g1lhQUU6.W6Pq6tF3V2xcwpS.'
// }]
// var authTokens = {
//     'd3854aa3-3b17-4003-86a0-e60b2da1c4c3': 'ryan@gladdenfamily.org',
//     '9afe7c5d-9c10-486f-b518-7225730a634c': 'ryan@gladdenfamily.org'
// }


apiRouter.get("/soup", (req, res) => {
    res.send("joe MAMA")
})

apiRouter.get("/user", (req, res) => {
    try {
        if (req.user) {
            console.log
            res.send({name: req.user.name, email: req.user.email})
        } else {
        res.status(403).send("Error: unauthorized\n");
        }
    } catch(ex) {
        res.status(500).send("Error: internal server error")
    }
})

apiRouter.post("/user", async (req, res) => {
    try {
        const {email, name, password} = req.body;
        if (!email || !name || !password) {
            res.status(400).send("Error: bad requeset");
            return null;
        }
        var user = {email: email, name: name, password: password};
        const userId = await db.createUser(user);
        if (!userId) {
            res.status(403).send("Error: user exists");
            return null;
        }
        const login = await db.login(email, password);
        auth.setAuthCookie(res, login.token);
        res.send({email: email, name: name});
    } catch(error) {
    res.status(500).send("Error: internal server error");
    }
});

apiRouter.post("/session", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).send("Error: bad request");
            return null;
        }
        const loginResult = await db.login(email, password);
        console.log(loginResult)
        if (loginResult) {
            auth.setAuthCookie(res, loginResult.token);
            res.send({email: email, name: loginResult.name});
        } else {
            res.status(403).send("Error: unauthorized")
        }
    } catch(error) {
        res.status(500).send("Error: internal server error");
    }
});

apiRouter.get("/session", db.authenticated, async (req, res) => {
    if (req.user) {
        res.send({authenticated: true, email: req.user.email, name: req.user.name})
    }
    else {
        res.send({authenticated: false});
    }
})

apiRouter.delete("/session", db.authenticated, db.requireAuth, async (req, res) => {
    if (req.user) {
        db.deleteAuth(req.cookies.token);
        res.clearCookie('token')
        res.status(200).send({});
    }
    else {
        res.status(400).send("Error: unauthorized");
    }
})

apiRouter.get("/docs/list", db.authenticated, db.requireAuth, (req, res) => {
        const newCards = docs.filter(cards, req.query);
        try {
            res.send(newCards);
        } catch(error) {
            res.send("Uh oh" + error);
        }
})

apiRouter.get("/docs/filter", (req, res) => {
    try {
        res.send(docs.createFilter(cards));
        } catch(ex) {
            res.status(500).send("Error: internal server error");
    }
})

apiRouter.post("/docs/upload", db.authenticated, db.requireAuth, s3.upload.single('file'), db.createDocument, (req, res) => {
    if (!req.file) {
        return res.status(400).send({Error: "no file uploaded"});
    }
    db.newDoc(req.user.user_id,)
})

apiRouter.get("/docs/:id", (req, res) => {
    const authToken = req.cookies.token;
    if (auth.authenticate(authToken, authTokens)) {
        console.log("document asked:")
        const docId = parseInt(req.params.id, 10);
        const document = cards.find((card) => card.id === docId);

        res.send(JSON.stringify(document));
    }
    else {
        res.status(400).send("Error: unauthorized");
    }
})

apiRouter.get("/api/docs/:id/file", (req, res) => {
    const authToken = req.cookies.token;
    if (auth.authenticate(authToken, authTokens)) {
        console.log("Getting file")
        const docId = parseInt(req.params.id, 10);
        const document = docs.getFileFromId(paths, docId);
        console.log(document)
        const filePath = path.join(__dirname, "../public/pdfs", document.path);
        res.sendFile(filePath);
    }
    else {
        res.status(400).send("Error: unauthorized");
    }
})

app.listen(port);
console.log("Listening on port " + port + "!");