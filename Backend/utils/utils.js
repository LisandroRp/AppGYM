//apikey=211dd90f - i=tt3896198  d0b64143
class Utils {
    static getUrlByKey () {
        const API_URL ="http://www.omdbapi.com/?apikey=";
        const API_KEY="211dd90f";
        const endpoint = `${API_URL}${API_KEY}`;
        return endpoint;
    }
}

module.exports = Utils;