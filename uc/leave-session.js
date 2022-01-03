module.exports = (findSessionWithGuests, endSession) => {

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
            }
        }

        delete session.guests[guestId] // todo notify

        let foundValidUser = false
        for (const guestId in session.guests) {
            if (!session.guests[guestId].isAwaitingAdmission) {
                foundValidUser = true
            }
        }

        if (!foundValidUser) {
            endSession(session)
        }
    }
}
