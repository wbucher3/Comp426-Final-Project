const userData = require('data-store')({path: process.cwd() + '/data/users.json'});

class User {

    constructor(username, password) {
        this.username = username.toString();
        this.password = password;
    }

}

// User.getAllIDs = () => {
//     return Object.keys(userData.data).map((id => {return parseInt(id);}));
// };

// User.getUserByTerm = (term) => {
//     return Object.keys(userData.data).filter(id => {

//         let user = userData.get(id).user;
//         if (user.includes(term)) {
//             return id;
//         }
//     }).map(id => userData.get(id));
// }

// User.findByID = (id) => {
//     let sdata = userData.get(id);
//     if (sdata != null) {
//         return new User(sdata.id, sdata.user, sdata.score);
//     } else {
//         return null;
//     }
// };

User.create = (user, score) => {
    let s = new User(user, score);
    userData.set(s.username, s);
    return s;
};

module.exports = User;