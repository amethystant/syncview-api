const {Guest} = require('../model/guest')

module.exports = (guestIdsRepo, validation) => {

    return (name, isHost) => {
        let validName = validation.guestName(name)
        return new Guest(guestIdsRepo.generateOne(), validName, isHost)
    }
}
