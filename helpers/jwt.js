const jwt = require("jsonwebtoken");

const signin = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY);
};

const verifying = (access_token) => {
    return jwt.verify(access_token, process.env.SECRET_KEY);
};

module.exports = {
    signin,
    verifying,
};
