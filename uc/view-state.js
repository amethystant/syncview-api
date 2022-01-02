module.exports = (sessionDurationMax, findSessionWithGuests) => {

    return (sessionCode, guestId) => {
        let session = findSessionWithGuests(sessionCode, [guestId])
        let guest = session[guestId]

        if (guest.isAwaitingAdmission) {
            return {
                code: session.code,
                isAwaitingAdmission: true
            }
        }

        let lastAction = session.actions.slice(-1)[0]

        let guestsView = []
        for (let key in session.guests) {
            let guest = session.guests[key]
            guestsView += {
                name: guest.name,
                id: guest.id,
                isHost: guest.isHost
            }
        }

        let result = {
            name: session.name,
            code: session.code,
            isAwaitingAdmission: guest.isAwaitingAdmission,
            isControlsGranted: guest.isHost || session.isControlsAllowed,
            expirationTs: session.startTs + sessionDurationMax,
            isPlaying: session.isPlaying,
            position: {
                position: session.position.position,
                updateTs: session.position.updateTs
            },
            lastAction: {
                initiator: {
                    guestId: lastAction.initiator,
                    guestName: session.guests[lastAction.initiator]
                },
                field: lastAction.field,
                value: lastAction.value,
                actionTs: lastAction.actionTs
            },
            guests: guestsView
        }

        if (guest.isHost) {
            result.isWaitingRoom = session.isWaitingRoom
            result.isControlsAllowed = session.isControlsAllowed
            result.admissionRequests = []

            for (let request of session.admissionRequests) {
                result.admissionRequests += {
                    guestId: request.guestId,
                    guestName: request.guestName
                }
            }
        }

        return result
    }
}
