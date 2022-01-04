const {AuthorizationError} = require('../error')

module.exports = (findSessionWithGuests, findGuests, sendStateUpdate) => {

    return (sessionCode, admitorId, admitteeId) => {
        let session = findSessionWithGuests(sessionCode, [admitorId, admitteeId])

        let admitor = session.guests[admitorId]
        if (!admitor.isHost) {
            throw new AuthorizationError('The admitor must be a host.')
        }

        let admittee = session.guests[admitteeId]
        admittee.isAwaitingAdmission = false
        sendStateUpdate(session, findGuests(session))
    }
}
