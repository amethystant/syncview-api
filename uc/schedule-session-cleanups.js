module.exports = (sessionCleanupInterval, cleanUpSessions) => {

    return () => {
        setInterval(() => cleanUpSessions(Date.now()), sessionCleanupInterval)
    }
}
