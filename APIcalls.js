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
            //url: 'https://comp426projectbackend.herokuapp.com/search',
            url: 'http://localhost:3030/search/' + searchTerm,
            withCredentials: true
        });
        return result;

    } catch (error) {
        return error;
    }
    
}

export const updateScore = async function(score) {
    try {
        const result = await axios({
            method: 'put',
            //url: 'https://comp426projectbackend.herokuapp.com/search',
            url: 'http://localhost:3030/score/' + id,
            score: newScore,
            withCredentials: true
        });
        return result;

    } catch (error) {
        return error;
    }
    
}
