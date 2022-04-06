const cors = require('cors')
const constants = require('../constants')

const corsOptions = {
    origin: constants.CORS_CLIENT_URLS,
    credentials: true
}

module.exports = () => {
    return cors(corsOptions)
}
