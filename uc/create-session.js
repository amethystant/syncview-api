const {Session} = require('../model/session')

module.exports = (sessionsDb, constructGuest, sessionCodesRepo) => {

    return (name, hostName, isWaitingRoom, isControlsAllowed, fileDescription) => {
        let host = constructGuest(hostName, true)
        host.isAwaitingAdmission = false

        let code = sessionCodesRepo.generateOne()
        let session = new Session(name, code, host, isWaitingRoom, isControlsAllowed, fileDescription)
        sessionsDb[code] = session

        return session
    }
}
