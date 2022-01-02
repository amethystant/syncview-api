module.exports = (validation, findSession, constructGuest) => {

    return (name, sessionCode) => {
        let session = findSession(sessionCode)
        let validName = validation.guestName(name)
        let guest = constructGuest(validName, false)

        guest.isAwaitingAdmission = session.isWaitingRoom // todo notify admin

        session.guests[guest.id] = guest
        return guest
    }
}
