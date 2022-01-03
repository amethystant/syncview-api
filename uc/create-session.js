const {Session} = require('../model/session')

module.exports = (sessionsDb, sessionCodesRepo, sessionCleanupRepo, validation, constructGuest) => {

    return (name, hostName, isWaitingRoom, isControlsAllowed, fileDescription) => {
        let validName = validation.sessionName(name)
        let validHostName = validation.guestName(hostName)
        let validIsWaitingRoom = validation.boolean(isWaitingRoom)
        let validIsControlsAllowed = validation.boolean(isControlsAllowed)
        let validFileDescription = validation.fileDescription(fileDescription)

        let host = constructGuest(validHostName, true)
        host.isAwaitingAdmission = false

        let code = sessionCodesRepo.generateOne()
        let session = new Session(
            validName,
            code,
            host,
            validIsWaitingRoom,
            validIsControlsAllowed,
            validFileDescription
        )
        sessionsDb[code] = session
        sessionCleanupRepo.registerSession(code, session.startTs)

        return {
            host: host,
            session: session
        }
    }
}
