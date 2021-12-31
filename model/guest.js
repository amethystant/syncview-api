class Guest {

    #id
    #name

    constructor(id, name, isHost) {
        this.#id = id
        this.#name = name
        this.isHost = isHost
        this.ws = null
        this.isAwaitingAdmission = !isHost
    }

    get id() {
        return this.#id
    }

    get name() {
        return this.#name
    }
}

module.exports = {Guest}
