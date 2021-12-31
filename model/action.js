class Action {

    #actionType
    #initiator
    #actionTs

    constructor(actionType, initiator, actionTs) {
        this.#actionType = actionType
        this.#initiator = initiator
        this.#actionTs = actionTs
    }

    get actionType() {
        return this.#actionType
    }

    get initiator() {
        return this.#initiator
    }

    get actionTs() {
        return this.#actionTs
    }
}

module.exports = {Action}