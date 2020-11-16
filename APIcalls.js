export const getAllScores = async function() {
    try {
        const result = await axios({
            method: 'get',
            url: 'http://localhost:3030/allScores',
           // withCredentials: true
        });
        return result;

    } catch (error) {
        return error;
    }
    
}