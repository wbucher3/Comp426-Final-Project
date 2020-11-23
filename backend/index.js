// produces whatever the module wants to export
const loginData = require('data-store')({path: process.cwd() + '/data/users.json'});

const express = require('express');

const app = express();

const Score = require('./score.js');

const Users = require('./user.js');

//cookies use express session
const cookieSession = require('cookie-session');
app.set('trustproxy', 1);

app.use(cookieSession({
    name: "GameSessionCookie",
    secret:"secret phrase",
    maxAge: 24 * 60 * 60 * 1000,
    resave: false,
    saveUninitialized: false,
    cookie: {
        // sameSite: 'Strict',
        // secure: true,
        SameSite: 'Strict',  //different capitalization?
        Secure: true
    }
}));

let cors = require('cors');

const corsConfig = {
    // origin: 'http://localhost:3000',
    origin: 'https://wbucher3.github.io',
    credentials: true
}
app.use(cors(corsConfig));

const bodyParser = require('body-parser');
const User = require('./user.js');
app.use(bodyParser.json());

//storage of user/passwords

const PORT = process.env.PORT || '3030';

app.post('/login', (req, res) => {

    let {user, password} = req.body
    
    let user_data = User.findByUsername(user);

    if (user_data == null) {
        res.status(404).send("Account Not Found");
        return;
    } 
    if (user_data.password == password) {

        req.session.loggedin = true;
        req.session.user = user;

        res.json(true);
        return;
    }
    res.status(403).send("Password Wrong")

    
});

app.post('/signup', (req, res) => {

    let {user, password} = req.body
    
    let user_data = User.findByUsername(user);

    if (user_data == null) {
        let u = Users.create(user, password);
        if (u == null) {
            res.status(400).send("Bad Request");
            return;
        }
        res.json(true);
        return;

    } else {
        res.status(403).send("Account Already Exists");
        return;
    }
    
});

// For testing purposes
app.delete('/deletee', (req, res) => {
    let {user} = req.body
    
    let user_data = User.findByUsername(user);

    let s = new User(user_data.password);

    s.delete(user);
    return;
});

//Gets the username of the current session
// in use
app.get('/user', (req, res) => {
    console.log(req.session.user);
    let username = req.session.user.toString();
    res.json(username);
    return;
})

//logs the user out of current session
app.get('/logout', (req, res) => {
    delete req.session.user;
    res.json(true);
});

//gets all scores in database with user attached to it
//in use
app.get('/allScores', (req, res) => {
    res.json(Score.getAllScores());
    return;
});

//idk what this does TODO
app.get('/game', (req,res) => {
    if (req.session.loggedin) {
        res.sendFile(path.join('../game.html'));
    }
});


//returns all the ids? TODO
app.get('/score', (req, res) => {
    res.json(Score.getAllIDs());
    return;
});

//gets all the users that include this search term
//in use
app.get('/search/:searchTerm', (req, res) =>{
    let term = req.params.searchTerm;
    res.json(Score.getUserByTerm(term));
    return;
})

//gets the score of a certain ID
app.get('/score/:id', (req, res) => {
    //ensures someone is logged in
    if (req.session.user == undefined) {
        res.status(403).send("Unauthorized");
    }


    let s = Score.findByID(req.params.id);

    if (s == null) {
        res.status(404).send("User not found");
        return;
    }
    
    //only get the id of yourself
    if (s.owner != req.session.user) {
        res.status(403).send("Unauthorized");
        return;
    }
    res.json(s);
});

//posts a score with logged in user and given score
app.post('/score', (req, res) => {
    //ensures someone is logged in
    if (req.session.user == undefined) {
        res.status(403).send("Unauthorized");
    }
    console.log(req.body);

    let {score} = req.body;
    console.log(score);
    // TODO : add checks with like 400 or 500 errors to make sure everything is good

    //user now comes from the login to prevent them from posting to other users
    let s = Score.create(req.session.user , score);
    if (s == null) {
        res.status(400).send("Bad Request");
        return;
    }
    return res.json(s);
});

//update score from given ID
app.put('/score/:id', (req, res) => {

    //ensures someone is logged in
    if (req.session.user == undefined) {
        res.status(403).send("Unauthorized");
    }

    let s = Score.findByID(req.params.id);
    if (s == null) {
        res.status(404).send("User not found");
        return;
    }
    //only update the score of yourself
    if (s.user != req.session.user) {
        res.status(403).send("Unauthorized");
        return;
    }

    let {score} = req.body;
    s.user = req.session.user;
    s.score = score;

    s.update();

    res.json(s);
;})

//delete a score from database
app.delete('/score/:id', (req, res) => {

    //ensures someone is logged in
    if (req.session.user == undefined) {
        res.status(403).send("Unauthorized");
    }

    let s = Score.findByID(req.params.id);
    
    if (s == null) {
        res.status(404).send("User not found");
        return;
    }
    //only delete the score of yourself
    if (s.owner != req.session.user) {
        res.status(403).send("Unauthorized");
        return;
    }

    s.delete();
    
    res.json(true);
});


//const port = 3030;
// heroku has an evironment varibale that will have a port number

 
app.listen(PORT, () => {
    console.log("Score up and running on port " + PORT);
})
