export const getAllScores = async function() {
    try {
        const result = await axios({
            method: 'get',
            //url: 'https://comp426projectbackend.herokuapp.com/allScores',
            url: 'http://localhost:3030/allScores',
            withCredentials: true
        });
        return result;

    } catch (error) {
        return error;
    }
    
}

export const login = async function(username, givenPassword) {
    try {
        const result = await axios({
            method: 'post',
            // url: 'https://comp426projectbackend.herokuapp.com/login',
            url: 'http://localhost:3030/login',
            data: {
                user: username,
                password: givenPassword,
            },
            withCredentials: true
        });
        return result;

    } catch (error) {
        return error;
    }
    
}

export const getName = async function() {
    try {
        const result = await axios({
            method: 'get',
            //url: 'https://comp426projectbackend.herokuapp.com/user',
            url: 'http://localhost:3030/user',
            withCredentials: true
        });
        return result;

    } catch (error) {
        return error;
    }
    
}

export const getSearchData = async function(searchTerm) {
    try {
        const result = await axios({
            method: 'get',
            //url: 'https://comp426projectbackend.herokuapp.com/search' + searchTerm,
            url: 'http://localhost:3030/search/' + searchTerm,
            withCredentials: true
        });
        return result;

    } catch (error) {
        return error;
    }
    
}

export const updateScore = async function(id, score) {
    try {
        const result = await axios({
            method: 'put',
            //url: 'https://comp426projectbackend.herokuapp.com/score/' + id,
            url: 'http://localhost:3030/score/' + id,
            score: score,
            withCredentials: true
        });
        return result;

    } catch (error) {
        return error;
    } 
}
export const postScore = async function(score) {
    console.log(score);
    try {
        const result = await axios({
            method: 'post',
            //url: 'https://comp426projectbackend.herokuapp.com/score/' + id,
            url: 'http://localhost:3030/score/',
            data: {
                score: score
            },
            withCredentials: true
        });
        return result;

    } catch (error) {
        return error;
    } 
}

export const logOut = async function() {
    try {
        const result = await axios({
            method: 'get',
            //url: 'https://comp426projectbackend.herokuapp.com/logout',
            url: 'http://localhost:3030/logout',
            withCredentials: true
        });
        return result;

    } catch (error) {
        return error;
    }
    
}


