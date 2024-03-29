module.exports = (sessionDurationMax, findSessionWithGuests) => {

    return (sessionCode, guestId) => {
        let session = findSessionWithGuests(sessionCode, [guestId])
        let guest = session.guests[guestId]

        if (guest.isAwaitingAdmission) {
            return {
                code: session.code,
                isAwaitingAdmission: true
            }
        }

        let lastAction = session.actions.slice(-1)[0]

        let guestsView = []
        let admissionRequests = []
        for (const key in session.guests) {
            let guest = session.guests[key]
            let view = {
                name: guest.name,
                id: guest.id,
                isHost: guest.isHost,
                isOnline: !!guest.ws
            }
            if (!guest.isAwaitingAdmission) {
                guestsView.push(view)
            } else {
                delete view.isHost
                admissionRequests.push(view)
            }
        }

        let lastActionView = null
        if (lastAction) {
            let lastActionInitiator = session.guests[lastAction.initiator]
            let initiatorView = lastActionInitiator ? {
                guestId: lastActionInitiator.id,
                guestName: lastActionInitiator.name
            } : null
            lastActionView = {
                initiator: initiatorView,
                field: lastAction.field,
                actionTs: lastAction.actionTs
            }
        }

        let result = {
            name: session.name,
            code: session.code,
            guestId: guestId,
            isAwaitingAdmission: guest.isAwaitingAdmission,
            isControlsGranted: guest.isHost || session.isControlsAllowed,
            expirationTs: session.startTs + sessionDurationMax,
            isPlaying: session.isPlaying,
            position: {
                position: session.position.position,
                updateTs: session.position.updateTs
            },
            lastAction: lastActionView,
            guests: guestsView
        }

        if (guest.isHost) {
            result.isWaitingRoom = session.isWaitingRoom
            result.isControlsAllowed = session.isControlsAllowed
            result.admissionRequests = admissionRequests
        }

        return result
    }
}
