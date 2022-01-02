const {InvalidInputError} = require('../error')

module.exports = {

    guestName(guestName) {
        let str = guestName.toString()
        if (!str || str.length > 20) {
            throw new InvalidInputError('Invalid guest name.')
        }
        return str
    },

    sessionName(sessionName) {
        let str = sessionName.toString()
        if (!str || str.length > 20) {
            throw new InvalidInputError('Invalid session name.')
        }
        return str
    },

    boolean(value) {
        if (typeof value !== 'boolean') {
            throw new InvalidInputError('Not a boolean.')
        }
        return value
    },

    fileDescription(fileDescription) {
        return fileDescription
    },

    position(position) {
        if (!position || !position.position || typeof position !== 'number' || position < 0) {
            throw new InvalidInputError('Invalid position.')
        }

        return position
    }
}
