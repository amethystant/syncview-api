const {AuthorizationError} = require('../error')

module.exports = (findSessionWithGuests) => {
    return (sessionCode, admitorId, admitteeId) => {
        let session = findSessionWithGuests([admitorId, admitteeId])

        let admitor = session.guests[admitorId]
        if (!admitor.isHost) {
            throw new AuthorizationError('The admitor must be a host.')
        }

        let admittee = session.guests[admitteeId]
        admittee.isAwaitingAdmission = false // todo notify guest
    }
}
