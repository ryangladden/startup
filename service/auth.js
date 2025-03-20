const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const db = require('./db');


function getUser(field, value) {
    return db.getUser(field, value)
}


async function createUser(email, name, password, users) {
    const user = {
        name: name,
        email: email,
        password: password
    }
    db.createUser(user)
    // if (getUser("email", email, users)) {
    //     throw new Error("user exists");
    // }
    // const pwHash = await bcrypt.hash(password, 10);

    // const user = {
    //     name: name,
    //     email: email,
    //     password: pwHash
    // };
    // return user;
}


async function login(email, password, users) {
    db.login(email, password)
}


async function setAuthCookie(res, authToken) {
    res.cookie('token', authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
  }

async function authenticate(req, res, next) {
    req.user = db.getAuth(req.cookie.token);
    next();
}


module.exports = {
    createUser,
    getUser,
    login,
    setAuthCookie,
    authenticate
};