const { login } = require('../APIcalls');

const loginData = require('data-store')({path: process.cwd() + '/data/users.json'});

class User {

    constructor(password) {
        this.password = password;
    }

    delete(user) {
        loginData.del(user);
    }

}

User.create = (user, password) => {
    let s = new User(password);
    loginData.set(user, s);
    return s;
};

module.exports = User;