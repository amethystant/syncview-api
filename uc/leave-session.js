module.exports = (findSessionWithGuests) => {

    return (sessionCode, guestId) => {
        let session = findSessionWithGuests(sessionCode, [guestId])
        let guest = session.guests[guestId]

        if (guest.isHost) {
            if (Object.keys(session.guests).length > 1) {
                let foundAnotherHost = false
                let hostCandidateId
                for (let cmpGuestId in session.guests) {
                    if (!session.guests[cmpGuestId].isAwaitingAdmission) {
                        hostCandidateId = cmpGuestId
                    }
                    if (session.guests[cmpGuestId].isHost && cmpGuestId != guestId) {
                        foundAnotherHost = true
                    }
                }

                if (!foundAnotherHost && hostCandidateId) {
                    session.guests[hostCandidateId].isHost = true // todo notify
                }

                // todo delete session if only waiting or none users are left
            }
        }

        delete session.guests[guestId] // todo notify
    }
}
