const baseURL = window.origin;
const api = "https://danbot.host/api";
const ID = "640161047671603205";

const getOauth = function(state) {
    let re = "/account"
    if(state) {
        re = state
    }
    const url = new URL("https://discordapp.com/oauth2/authorize");
    url.search = new URLSearchParams([
        ["redirect_uri", baseURL + "/callback"],
        ["response_type", "code"],
        ["scope", ["identify", "email"].join(" ")],
        ["client_id", ID],
        ["prompt", "none"],
        ["state", re]
    ]);

    return url.href;
};

export {
    getOauth
}

export default api;