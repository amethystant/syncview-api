const {Position} = require('./position')

class Session {

    #code
    #fileDescription
    #guests
    #actions = []
    #startTs = Date.now()

    constructor(name, code, host, isWaitingRoom, isControlsAllowed, fileDescription) {
        this.name = name
        this.#code = code
        this.#guests = {}
        this.#guests[host.id] = host
        this.isWaitingRoom = isWaitingRoom
        this.isControlsAllowed = isControlsAllowed
        this.#fileDescription = fileDescription
        this.isPlaying = false
        this.position = new Position(0, 0)
    }

    get code() {
        return this.#code
    }

    get fileDescription() {
        return this.#fileDescription
    }

    get guests() {
        return this.#guests
    }

    get actions() {
        return this.#actions
    }

    get startTs() {
        return this.#startTs
    }
}

module.exports = {Session}
