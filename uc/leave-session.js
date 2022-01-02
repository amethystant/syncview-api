module.exports = (findSessionWithGuests) => {

    return (sessionCode, guestId) => {
        let session = findSessionWithGuests(sessionCode, [guestId])
        let guest = session.guests[guestId]

        if (guest.isHost) {
            if (Object.keys(session.guests).length > 1) {
                let foundAnotherHost = false
                let hostCandidateId
                for (let cmpGuestId in session.guests) {
                    hostCandidateId = cmpGuestId
                    if (session.guests[cmpGuestId].isHost && cmpGuestId != guestId) {
                        foundAnotherHost = true
                    }
                }

                if (!foundAnotherHost) {
                    session.guests[hostCandidateId].isHost = true // todo notify
                }
            }
        }

        delete session.guests[guestId] // todo notify
    }
}
