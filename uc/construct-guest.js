const {Guest} = require('../model/guest')

class ConstructGuest {

    #guestIdsRepo

    constructor(guestIdsRepo) {
        this.#guestIdsRepo = guestIdsRepo
    }

    run(name, isHost) {
        return new Guest(this.#guestIdsRepo.generateOne(), name, isHost)
    }
}

module.exports = guestIdsRepo => new ConstructGuest(guestIdsRepo)
