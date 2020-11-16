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
            //url: 'https://comp426projectbackend.herokuapp.com/login',
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

export const isLoggedIn = async function() {
    try {
        const result = await axios({
            method: 'get',
            //url: 'https://comp426projectbackend.herokuapp.com/isLogged',
            url: 'http://localhost:3030/isLogged',
            //withCredentials: true
        });
        return result;

    } catch (error) {
        return error;
    }
    
}

export const bootUp = async function() {
    try {
        const result = await axios({
            method: 'get',
            url: 'https://comp426projectbackend.herokuapp.com/',
            //url: 'http://localhost:3030/isLogged',
            //withCredentials: true
        });
        return result;

    } catch (error) {
        return error;
    }
    
}