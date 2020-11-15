// produces whatever the module wants to export
const express = require('express');

const app = express();

const Score = require('./score.js');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/score', (req, res) => {
    res.json(Score.getAllIDs());
    return;
});

app.get('/score/:id', (req, res) => {
    let s = Score.findByID(req.params.id);
    if (s == null) {
        res.status(404).send("User not found");
        return;
    }
    res.json(s);
});

app.post('/score', (req, res) => {
    let {user, score} = req.body
    // TODO : add checks with like 400 or 500 errors to make sure everything is good

    let s = Score.create(user, score);
    if (s == null) {
        res.status(400).send("Bad Request");
        return;
    }
    return res.json(s);
});

app.put('/score/:id', (req, res) => {
    let s = Score.findByID(req.params.id);
    if (s == null) {
        res.status(404).send("User not found");
        return;
    }

    let {user, score} = req.body;
    s.user = user;
    s.score = score;

    s.update();

    res.json(s);
;})

app.delete('/score/:id', (req, res) => {
    let s = Score.findByID(req.params.id);
    if (s == null) {
        res.status(404).send("User not found");
        return;
    }
    s.delete();
    
    res.json(true);
});

// heroku has an evironment varibale that will have a port number
const port = 3030;

app.listen(port, () => {
    console.log("Score up and running on port " + port);
})
