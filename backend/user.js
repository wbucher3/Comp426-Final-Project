
const loginData = require('data-store')({path: process.cwd() + '/data/users.json'});

class User {

    constructor(password) {
        this.password = password;
    }

    delete(user) {
        loginData.del(user);
    }

}

User.findByUsername = (user) => {
    let sdata = loginData.get(user);
    if (sdata != null) {
        return new User(sdata.password);
    } else {
        return null;
    }
};

User.create = (user, password) => {
    let s = new User(password);
    loginData.set(user, s);
    return s;
};

module.exports = User;