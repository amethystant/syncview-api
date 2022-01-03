const {NotFoundError} = require('../error')
const {SESSION_DURATION_MAX} = require('../constants')

module.exports = (sessionDb) => {

    return (sessionCode) => {
        let sessionExists = sessionCode && sessionCode in sessionDb
        if (sessionExists && Date.now() < sessionDb[sessionCode].startTs + SESSION_DURATION_MAX) {
            return sessionDb[sessionCode.toLowerCase()]
        }

        throw new NotFoundError('No session found.')
    }
}
