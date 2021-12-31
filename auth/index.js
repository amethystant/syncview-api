const jwt = require('jsonwebtoken')

const {TOKEN_SECRET} = require('../secrets')
const {SESSION_DURATION_MAX} = require('../constants')

function generateToken(guestId) {
    return jwt.sign(guestId, TOKEN_SECRET, {expiresIn: `${SESSION_DURATION_MAX}ms`}, null)
}

function authenticateToken(token, guestId) {
    return guestId === jwt.verify(token, TOKEN_SECRET, null, null) // todo test this
}

module.exports = {generateToken, authenticateToken}
