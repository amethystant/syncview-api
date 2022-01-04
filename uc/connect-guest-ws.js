module.exports = (findSessionWithGuests, findGuests, sendStateUpdate) => {

    return (sessionCode, guestId, ws) => {
        let session = findSessionWithGuests(sessionCode, [guestId])
        let guest = session.guests[guestId]

        if (guest.ws) {
            guest.ws.close()
        }

        guest.ws = ws
        sendStateUpdate(session, findGuests(session))

        ws.on('close', () => {
            delete guest.ws
            sendStateUpdate(session, findGuests(session))
        })
    }
}
