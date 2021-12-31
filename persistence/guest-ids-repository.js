const crypto = require('crypto')

const ids = {}

function generateOne() {
    let id
    do {
        id = crypto.randomUUID()
    } while (id in ids)

    ids[id] = true
    return id
}

function deleteOne(id) {
    if (!(id in ids)) {
        throw new Error('ID doesn\'t exist.')
    }

    delete ids[id]
}

module.exports = {generateOne, deleteOne}
