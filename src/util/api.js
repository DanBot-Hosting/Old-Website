const baseURL = window.origin;
const api = "https://api.danbot.host";
const ID = "640161047671603205";
const { REACT_APP_API_TOKEN } = process.env;

const getOauth = function (state) {
    let re = "/account"
    if (state) {
        re = state
    }
    const url = new URL("https://discordapp.com/oauth2/authorize");
    url.search = new URLSearchParams([
        ["redirect_uri", baseURL + "/callback"],
        ["response_type", "code"],
        ["scope", ["identify"].join(" ")],
        ["client_id", ID],
        ["prompt", "none"],
        ["state", re]
    ]);

    return url.href;
};

const fetchStats = async function () {
    const res = await fetch(`${api}/stats`);
    const result = await res.json();
    return result;
};

const user = async function (code) {
    if (!code || code === "n/a") return;
    const user = await fetch(`${api}/callback?code=${code}&redirect=${baseURL}`, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    }).then(res => res.json());

    console.log(user)
    return user;
};

const fetchUser = async function (ID) {
    const res = await fetch(`${api}/user/${ID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": REACT_APP_API_TOKEN
        }
    }).then(res => res.json());
    return res;
};

const userCreate = async function (ID,body) {
    const res = await fetch(`${api}/user/${ID}/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": REACT_APP_API_TOKEN
        },
        body: body
    }).then(res => res.json());
    return res;
};

const fetchUserServers = async function (ID) {
    const res = await fetch(`${api}/user/${ID}/servers`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": REACT_APP_API_TOKEN
        }
    }).then(res => res.json());
    return res;
};

const fetchUserCode = async function (ID) {
    const res = await fetch(`${api}/user/${ID}/password-reset-code`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": REACT_APP_API_TOKEN
        }
    }).then(res => res.json());
    return res;
};

export {
    getOauth,
    fetchStats,
    user,
    fetchUser,
    userCreate,
    fetchUserServers,
    fetchUserCode
}

export default api;