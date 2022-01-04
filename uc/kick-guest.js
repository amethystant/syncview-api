const {AuthorizationError} = require('../error')

module.exports = (findSessionWithGuests, findGuests, sendStateUpdate) => {

    return (sessionCode, kickingGuestId, kickedGuestId) => {
        let session = findSessionWithGuests(sessionCode, [kickingGuestId, kickedGuestId])
        let kickingGuest = session.guests[kickingGuestId]
        let kickedGuest = session.guests[kickedGuestId]

        if (!kickingGuest.isHost || kickedGuest.isHost) {
            throw new AuthorizationError('Unauthorized.')
        }

        delete session.guests[kickedGuestId]
        if (kickedGuest.ws) {
            kickedGuest.ws.close()
        }
        sendStateUpdate(session, findGuests(session))
    }
}
