module.exports = (sessionsDb) => {

    return (session) => {

        // todo notify guests
        delete sessionsDb[session.code]
    }
}
