const {InvalidInputError} = require('../error')

module.exports = {

    guestName(guestName) {
        let str = guestName.toString()
        return (str && str.length <= 20) ? str : throw new InvalidInputError('Invalid guest name.')
    },

    sessionName(sessionName) {
        let str = sessionName.toString()
        return (str && str.length <= 20) ? str : throw new InvalidInputError('Invalid session name.')
    },

    boolean(value) {
        return typeof value == 'boolean' ? value : throw new InvalidInputError('Not a boolean.')
    },

    fileDescription(fileDescription) {
        return true
    }
}
