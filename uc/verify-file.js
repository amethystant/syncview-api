const {AuthorizationError} = require('../error')

module.exports = (findSessionWithGuests) => {

    return (sessionCode, guestId, fileDescription) => {
        let session = findSessionWithGuests(sessionCode, [guestId])
        let guest = session.guests[guestId]

        if (!guest.isHost && guest.isAwaitingAdmission) {
            throw new AuthorizationError('Not authorized.')
        }

        return 0 // todo implement file check
    }
}
