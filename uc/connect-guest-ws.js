module.exports = (findSessionWithGuests) => {

    return (sessionCode, guestId, ws) => {
        let session = findSessionWithGuests(sessionCode, [guestId])
        let guest = session.guests[guestId]

        if (guest.ws) {
            guest.ws.close()
        }

        guest.ws = ws

        ws.on('close', () => {
            delete guest.ws
        })
    }
}
