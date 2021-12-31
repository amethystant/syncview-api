const ids = {}

function generateOne() {
    let id = 0
    while (id in ids) {
        id = Math.random()
    }

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
