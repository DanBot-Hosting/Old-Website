const BASE_URL="http://192.168.0.27/api";

const rawRequest = (route, method = "GET", headers = {}, body) => new Promise((resolve, reject) => {
    fetch(BASE_URL +route, {
        method,
        headers,
        body
    }).then(response => response.json()).then(resolve).catch(reject);
});

const authenticatedRequest = (route, method = "GET", body) => new Promise((resolve, reject) => {
    rawRequest(route, method , { authentication: localStorage.getItem('token'),  } ,body)
    .then(resolve).catch(reject);
});

const logIn = (code) => 
    authenticatedRequest(
        `/login?code=${code}`
    );

    const getOauth = function (state) {
        return 'https://auth.danbot.host';
    };

export { 
    BASE_URL,
    logIn,
    getOauth
};