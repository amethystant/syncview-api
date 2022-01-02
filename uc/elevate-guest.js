const {AuthorizationError} = require('../error')

module.exports = (findSessionWithGuests) => {

    return (sessionCode, elevatingGuestId, elevatedGuestId) => {
        let session = findSessionWithGuests(sessionCode, [elevatingGuestId, elevatedGuestId])
        let elevatingGuest = session.guests[elevatingGuestId]
        let elevatedGuest = session.guests[elevatedGuestId]

        if (!elevatingGuest.isHost) {
            throw new AuthorizationError('Unauthorized.')
        }

        elevatedGuest.isAwaitingAdmission = false
        elevatedGuest.isHost = true // todo notify guest
    }
}