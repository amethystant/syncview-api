const {Session} = require('../model/session')

class CreateSession {

    #sessionsDb
    #createGuest
    #sessionCodesRepo

    constructor(sessionsDb, createGuest, sessionCodesRepo) {
        this.#sessionsDb = sessionsDb
        this.#createGuest = createGuest
        this.#sessionCodesRepo = sessionCodesRepo
    }

    run(name, hostName, isWaitingRoom, isControlsAllowed, fileDescription) {
        let host = this.#createGuest.run(hostName, true)
        host.isAwaitingAdmission = false

        let code = this.#sessionCodesRepo.generateOne()
        let session = new Session(name, code, host, isWaitingRoom, isControlsAllowed, fileDescription)
        this.#sessionsDb[code] = session

        return session
    }
}

module.exports = (sessionsDb, constructGuest, sessionCodesRepo) =>
    new CreateSession(sessionsDb, constructGuest, sessionCodesRepo)
