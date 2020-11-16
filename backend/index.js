// produces whatever the module wants to export
const express = require('express');

const app = express();

const Score = require('./score.js');

//cookies use express session
const expressSession = require('express-session');

app.use(expressSession({
    name: "GameSessionCookie",
    secret:"secret phrase",
    resave: false,
    saveUninitialized: false
}));

let cors = require('cors')

app.use(cors())

const bodyParser = require('body-parser');

app.use(bodyParser.json());

//storage of user/passwords
const loginData = require('data-store')({path: process.cwd() + '/data/users.json'});

const PORT = process.env.PORT||'3030';

app.post('/login', (req,res) => {

    let {user, password} = req.body
    
    let user_data = loginData.get(user);

    if (user_data == null) {
        res.status(404).send("Not Found");
        return;
    } 
    if (user_data.password == password) {
        req.session.user = user;
        res.json(true);
        return;
    }
    res.status(403).send("Password Wrong")
});

app.get('/logout', (req, res) => {
    delete req.session.user;
    res.json(true);
});

app.get('/allScores', (req, res) => {
    res.json(Score.getAllScores());
    return;
})




app.get('/score', (req, res) => {
    res.json(Score.getAllIDs());
    return;
});

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

app.post('/score', (req, res) => {

    //ensures someone is logged in
    if (req.session.user == undefined) {
        res.status(403).send("Unauthorized");
    }


    let {user, score} = req.body
    // TODO : add checks with like 400 or 500 errors to make sure everything is good

    //user now comes from the login to prevent them from posting to other users
    let s = Score.create(req.session.user , score);
    if (s == null) {
        res.status(400).send("Bad Request");
        return;
    }
    return res.json(s);
});

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
    if (s.owner != req.session.user) {
        res.status(403).send("Unauthorized");
        return;
    }

    let {user, score} = req.body;
    s.user = user;
    s.score = score;

    s.update();

    res.json(s);
;})

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
