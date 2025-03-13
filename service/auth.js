const bcrypt = require('bcryptjs');
const uuid = require('uuid');


function getUser(field, value, users) {
    const thisUser = users.find((user) => user[field] === value);
    return thisUser;
}


async function createUser(email, name, password, users) {
    if (getUser("email", email, users)) {
        throw new Error("user exists");
    }
    const pwHash = await bcrypt.hash(password, 10);

    const user = {
        name: name,
        email: email,
        password: pwHash
    };
    return user;
}


async function login(email, password, users) {
    const user = await getUser('email', email, users);
    if (user) {
        if (await bcrypt.compare(password, user.password)) {
            const token = uuid.v4();
            return token;
        }
        else {
            throw new Error("username or password incorrect");
        }
    } else {
        throw new Error("unathorized")
    }
}


function setAuthCookie(res, authToken) {
    res.cookie('token', authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
  }

function authenticate(token, authTokens) {
    return (authTokens[token] != null);
}


module.exports = {
    createUser,
    getUser,
    login,
    setAuthCookie,
    authenticate
};