const crypto = require('crypto')

function generateOne() {
    return crypto.randomUUID()
}

module.exports = {generateOne}
