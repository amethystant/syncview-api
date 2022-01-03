class Action {

    #initiator
    #field
    #value
    #actionTs

    constructor(initiator, field, value, actionTs) {
        this.#initiator = initiator
        this.#field = field
        this.#value = value
        this.#actionTs = actionTs
    }

    get initiator() {
        return this.#initiator
    }

    get field() {
        return this.#field
    }

    get value() {
        return this.#value
    }

    get actionTs() {
        return this.#actionTs
    }
}

module.exports = {Action}