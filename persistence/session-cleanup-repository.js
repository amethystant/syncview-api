module.exports = (sessionDurationMax, sessionCleanupInterval) => {

    let slots = {}
    return {
        registerSession(sessionCode, sessionStartTs) {
            let expiration = sessionStartTs + sessionDurationMax
            let slot = Math.floor(expiration / sessionCleanupInterval)

            if (!slots[slot]) {
                slots[slot] = []
            }

            slots[slot].push(sessionCode)
        },

        popSessionCodes(ts) {
            let slot = Math.floor(ts / sessionCleanupInterval) - 1
            let sessionsCodes = slots[slot] ?? []
            delete slots[slot]

            return sessionsCodes
        }
    }
}
