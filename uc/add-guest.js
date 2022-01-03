module.exports = (validation, findSession, constructGuest, findGuests, sendStateUpdate) => {

    return (name, sessionCode) => {
        let session = findSession(sessionCode)
        let validName = validation.guestName(name)
        let guest = constructGuest(validName, false)

        guest.isAwaitingAdmission = session.isWaitingRoom
        session.guests[guest.id] = guest

        sendStateUpdate(session, findGuests(session, guest.isAwaitingAdmission))
        return guest
    }
}
