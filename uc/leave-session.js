module.exports = (findSessionWithGuests, endSession, findGuests, sendStateUpdate) => {

    return (sessionCode, guestId) => {
        let session = findSessionWithGuests(sessionCode, [guestId])
        let guest = session.guests[guestId]

        if (guest.isHost) {
            if (Object.keys(session.guests).length > 1) {
                let foundAnotherHost = false
                let hostCandidateId
                for (let cmpGuestId in session.guests) {
                    let cmpGuest = session.guests[cmpGuestId]
                    if (!cmpGuest.isAwaitingAdmission && cmpGuest.ws) {
                        hostCandidateId = cmpGuestId
                    }
                    if (cmpGuest.isHost && cmpGuestId != guestId) {
                        foundAnotherHost = true
                    }
                }

                if (!foundAnotherHost && hostCandidateId) {
                    session.guests[hostCandidateId].isHost = true
                }
            }
        }

        delete session.guests[guestId]
        sendStateUpdate(session, findGuests(session))

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
