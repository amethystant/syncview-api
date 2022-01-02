const {NotFoundError} = require('../error')

module.exports = (findSession) => {

    return (sessionCode, guestIds) => {
        let session = findSession(sessionCode)
        let foundIssue = false
        for (const guestId of guestIds) {
            if (!(guestId in session.guests)) {
                foundIssue = true
            }
        }

        if (foundIssue) {
            throw new NotFoundError('Guest not found in session.')
        }

        return session
    }
}
