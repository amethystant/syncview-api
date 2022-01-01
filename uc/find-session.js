const {NotFoundError} = require('../error')

module.exports = (sessionDb) => {

    return (sessionCode) => {
        if (sessionCode && sessionCode in sessionDb) {
            return sessionDb[sessionCode]
        }

        throw new NotFoundError('No session found.')
    }
}
