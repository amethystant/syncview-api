class Position {

    #position
    #updateTs

    constructor(position, updateTs) {
        this.#position = position
        this.#updateTs = updateTs
    }

    get position() {
        return this.#position
    }

    get updateTs() {
        return this.#updateTs
    }
}

module.exports = {Position}
// todo update code to use this class