const {Guest} = require('../model/guest')

module.exports = (guestIdsRepo) => {
    return (name, isHost) => {
        return new Guest(guestIdsRepo.generateOne(), name, isHost)
    }
}
