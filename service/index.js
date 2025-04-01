const port = process.argv.length > 2 ? process.argv[2] : 4000;

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
let apiRouter = express.Router();
// const auth = require("./auth");
const db = require("./db");
const s3 = require("./s3");



app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(`/api`, apiRouter);


async function setAuthCookie(res, authToken) {
    res.cookie('token', authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
  }


apiRouter.get("/soup", (req, res) => {
    res.send("joe MAMA")
})

apiRouter.get("/user", db.authenticated, (req, res) => {
    try {
        if (req.user) {
            res.send({name: req.user.name, email: req.user.email})
        } else {
        return res.status(403).send("Error: unauthorized\n");
        }
    } catch(ex) {
        return res.status(500).send("Error: internal server error")
    }
})

apiRouter.post("/user", async (req, res) => {
    try {
        const {email, name, password} = req.body;
        if (!email || !name || !password) {
            return res.status(400).send("Error: bad requeset");
        }
        var user = {email: email, name: name, password: password};
        const userId = await db.createUser(user);
        if (!userId) {
            return res.status(403).send("Error: user exists");
        }
        const login = await db.login(email, password);
        setAuthCookie(res, login.token);
        res.send({email: email, name: name});
    } catch(error) {
    return res.status(500).send("Error: internal server error");
    }
});

apiRouter.post("/session", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Error: bad request");
        }
        const loginResult = await db.login(email, password);
        if (loginResult) {
            setAuthCookie(res, loginResult.token);
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

apiRouter.get("/docs/list", db.authenticated, db.requireAuth, async (req, res) => {
        const documents = await db.getDocuments(req);
        try {
            res.send(documents);
        } catch(error) {
            res.send("Uh oh" + error);
        }
})

apiRouter.get("/docs/filter", db.authenticated, db.requireAuth, async (req, res) => {
    try {
        const documents = await db.getAllDocuments(req.user.user_id);
        res.send(db.createFilter(documents));
        } catch(ex) {
            res.status(500).send("Error: internal server error");
    }
})

apiRouter.post("/docs/upload", db.authenticated, db.requireAuth, s3.upload.single('file'), db.createDocument, (req, res) => {
    if (!req.file) {
        return res.status(400).send({Error: "no file uploaded"});
    }
    res.status(200).send("File uploaded");
})

apiRouter.get("/docs/:id", db.authenticated, db.requireAuth, async (req, res) => {
    const docId = req.params.id;
    var document = await db.getDocumentById(docId);
    const role = await db.getUserRole(req.user.user_id, docId);
    const url = await s3.generateUrl(document.key)
    const owner = await db.getDocOwner(docId);
    document.key = url;
    document.role = role.role;
    document.owner = owner.email;
    res.send(JSON.stringify(document));
})

apiRouter.put("/docs/share", db.authenticated, db.requireAuth, async (req, res) => {
    console.log(req.body)
    const collaborator = await db.getUser("email", req.body.email);
    console.log(collaborator);
    await db.addViewer(collaborator._id, req.body.id);
    res.send("Shared")
})

apiRouter.get("/share/request", db.authenticated, db.requireAuth, async (req, res) =>{
    const users = await db.getShareRequests(req.user.user_id);
    res.send(users);
})

apiRouter.put("/share/request", db.authenticated, db.requireAuth, async (req, res) => {
    await db.collabRequest(req.user.user_id, req.body.email);

})

apiRouter.post("/share/request", db.authenticated, db.requireAuth, async (req, res) => {
    if (req.body.accept === true) {
        await db.acceptRequest(req.user.user_id, req.body.email);
    } else {
        await db.denyRequest(req.user.user_id, req.body.email);
    }
    res.send("received brother");
})

apiRouter.get("/share/collaborators", db.authenticated, db.requireAuth, async (req, res) => {
    const collaborators = await db.getCollaborators(req.user.user_id);
    if (collaborators) {
        res.send(collaborators.map((collaborator) => ({name: collaborator.name, email: collaborator.email})))
    }
    else { res.send([]) }
})

app.listen(port);
console.log("Listening on port " + port + "!");