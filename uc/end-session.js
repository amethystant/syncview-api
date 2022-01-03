module.exports = (sessionsDb) => {

    return (session) => {
        delete sessionsDb[session.code]

        for (const guestId in session.guests) {
            let guest = session.guests[guestId]
            if (guest.ws) {
                guest.ws.close()
            }
        }
    }
}
