const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const db = require("./db");
const s3 = require("./s3");

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const apiRouter = express.Router();
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
    var role = await db.getUserRole(req.user.user_id, docId);
    if (role === null) {
        role = "viewer";
    }
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

apiRouter.get("/share/collaborators/messages", db.authenticated, db.requireAuth, async (req,res) => {
    const messages = await db.getMessages(req.user.email);
    res.send(messages);
})

apiRouter.post("/share/post", db.authenticated, db.requireAuth, async (req, res) => {
    const {document_id, text} = req.body;
    if (!document_id || !text || text === "") {
        return res.status(400).send("Error: bad request");
    }
    console.log(document_id);
    const post = await db.createPost(req.user.user_id, document_id, text);
    console.log(post);
    res.send("received");
})

apiRouter.get("/share/posts", db.authenticated, db.requireAuth, async (req, res) => {
    const posts = await db.getPosts(req.user.user_id);
    res.send(posts);
})

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
// console.log("Listening on port " + port + "!");

// ____________________-

const { WebSocketServer } = require('ws');
const socketServer = new WebSocketServer({ server });
const cookie = require('cookie');

var clients = {}

function addConnection(user, socket) {
    if (clients[user.email]) {
        clients[user.email].push(socket);
    } else {
        clients[user.email] = [socket]
    }
}


socketServer.on("connection", async (socket, request) => {
    var user = null;
    const headers = cookie.parse(request.headers.cookie)
    if (headers.token) {
        user = await db.getAuth(headers.token);
    }
    if (user === null) {
        socket.close()
    } else {
        addConnection(user, socket);


        socket.on("message", async (data) => {
            const message = JSON.parse(data).name;
            message.sender = user.email;
            if (clients[message.receiver]) {
                for (const conn of clients[message.receiver]) {
                    conn.send(JSON.stringify(message));
            }}
        db.addMessage(message);
    })

        socket.on("close", () => {
            const current = clients[user.email].indexOf(socket);
            clients[user.email].splice(current, 1);
        })
    }
}
) 
