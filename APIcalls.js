export const getAllScores = async function() {
    try {
        const result = await axios({
            method: 'get',
            url: 'https://comp426projectbackend.herokuapp.com/allScores',
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
            url: 'https://comp426projectbackend.herokuapp.com/login',
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
            url: 'https://comp426projectbackend.herokuapp.com/user',
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
            url: 'https://comp426projectbackend.herokuapp.com/search/' + searchTerm,
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
            url: 'https://comp426projectbackend.herokuapp.com/score/' + id,
            data : {
                score: score
            },
            withCredentials: true
        });
        return result;

    } catch (error) {
        return error;
    } 
}
export const postScore = async function(score) {
    try {
        const result = await axios({
            method: 'post',
            url: 'https://comp426projectbackend.herokuapp.com/score',
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
            url: 'https://comp426projectbackend.herokuapp.com/logout',
            // url: 'http://localhost:3030/logout',
            withCredentials: true
        });
        return result;

    } catch (error) {
        return error;
    }
    
}

export const signup = async function(username, givenPassword) {
    try {
        const result = await axios({
            method: 'post',
            url: 'https://comp426projectbackend.herokuapp.com/signup',
            // url: 'http://localhost:3030/signup',
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

export const checkLogin = async function() {
    try {
        const result = await axios({
            method: 'get',
            url: 'https://comp426projectbackend.herokuapp.com/checkLogin',
            // url: 'http://localhost:3030/checkLogin',
            withCredentials: true
        });
        return result;

    } catch (error) {
        return error;
    }
    
}
