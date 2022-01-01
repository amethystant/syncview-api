module.exports = (sessionsDb, constructGuest) => {
    return (name, sessionCode) => {
        let guest = constructGuest(name, false)
        let session = sessionsDb[sessionCode]

        if (session.isWaitingRoom) {
            guest.isAwaitingAdmission = true // todo notify admin
        }

        session.guests += guest
        return guest
    }
}
