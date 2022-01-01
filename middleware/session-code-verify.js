const sessionsDb = require('../persistence/sessions-db')

module.exports = (req, res, next) => { // todo test this
    if (req.params.sessionCode && req.params.sessionCode in sessionsDb) {
        next()
    } else {
        let err = new Error('Invalid session code')
        err.statusCode = 400
        throw err
    }
}
