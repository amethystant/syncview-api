const jwt = require('jsonwebtoken')

const {TOKEN_SECRET} = require('../secrets')

function generateToken(guestId) {
    return jwt.sign(guestId, TOKEN_SECRET, null, null)
}

function authenticateToken(token) {
    return jwt.verify(token, TOKEN_SECRET, null, null)
}

module.exports = {generateToken, authenticateToken}
