const jwt = require("jsonwebtoken");
require("dotenv").config();

function tokenGenerator(data) {
    const token = jwt.sign({ data }, process.env.SECRET, { expiresIn: "1h" });
    return token;
}

module.exports = { tokenGenerator };