module.exports = (sessionDurationMax, sessionsDb, sessionCleanupRepo, endSession) => {

    return (ts) => {
        let codes = sessionCleanupRepo.popSessionCodes(ts)

        for (const code of codes) {
            let session = sessionsDb[code]
            if (session.startTs + sessionDurationMax > ts) {
                throw new Error('Session not expired but scheduled for cleanup!')
            }

            endSession(session)
        }
    }
}
