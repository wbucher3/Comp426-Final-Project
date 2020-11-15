const scoreData = require('data-store')({path: process.cwd() + '/data/score.json'});

class Score {

    constructor(id, user, score) {
        this.id = id;
        this.user = user.toString();
        this.score = score;
    }

    update() {
        scoreData.set(this.id.toString(), this);
    }

    delete() {
        scoreData.del(this.id.toString());
    }

}

Score.getAllIDs = () => {
    return Object.keys(scoreData.data).map((id => {return parseInt(id);}));
};

Score.findByID = (id) => {
    let sdata = scoreData.get(id);
    if (sdata != null) {
        return new Score(sdata.id, sdata.user, sdata.score);
    } else {
        return null;
    }
};

Score.create = (user, score) => {
    let id = Score.getAllIDs().reduce((max, nextID) => {
        if (max < nextID) {
            return nextID;
        }
        return max;
    }, -1) + 1;

    let s = new Score(id, user, score);
    scoreData.set(s.id.toString(), s);
    return s;
};

module.exports = Score;