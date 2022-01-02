const {AuthorizationError} = require('../error')

module.exports = (findSessionWithGuests) => {

    return (sessionCode, kickingGuestId, kickedGuestId) => {
        let session = findSessionWithGuests(sessionCode, [kickingGuestId, kickedGuestId])
        let kickingGuest = session.guests[kickingGuestId]
        let kickedGuest = session.guests[kickedGuestId]

        if (!kickingGuest.isHost || kickedGuest.isHost) {
            throw new AuthorizationError('Unauthorized.')
        }

        delete session.guests[kickedGuestId]
        // todo notify kicked guest now, don't close ws connection though
    }
}
