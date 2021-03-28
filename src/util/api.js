const baseURL = window.origin;
const api = "https://api.danbot.host";
const ID = "640161047671603205";

const getOauth = function (state) {
    let re = "/account"
    if (state) {
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

const fetchStats = async function () {
    const res = await fetch(`${api}/stats`);
    const result = await res.json();
    return result;
};

const user = async function (code) {
    if (!code || code === "n/a") return;
    const user = await fetch(`${api}/callback?code=${code}&redirect=${baseURL}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"}
    }).then(res => res.json());

    localStorage.setItem("user", JSON.stringify(user));
    return user;
};

export {
    getOauth,
    fetchStats,
    user
}

export default api;