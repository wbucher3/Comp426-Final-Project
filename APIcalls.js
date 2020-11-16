export const getAllScores = async function() {
    try {
        const result = await axios({
            method: 'get',
            url: 'https://comp426projectbackend.herokuapp.com/allScores',
           // withCredentials: true
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
                password: givenPassword
            }
           // withCredentials: true
        });
        return result;

    } catch (error) {
        return error;
    }
    
}