const {SESSION_CODE_LENGTH} = require('../constants')

const codes = {}

function generateOne() {
    let code
    do {
        code = ''
        let characters = 'abcdefghijklmnopqrstuwvxyz'
        for (let i = 0; i < SESSION_CODE_LENGTH; i++) {
            code += characters.charAt(Math.random() * characters.length)
        }
    } while (code in codes)

    codes[code] = true
    return code
}

function deleteOne(code) {
    if (!(code in codes)) {
        throw new Error('Code doesn\'t exist.')
    }

    delete codes[code]
}

module.exports = {generateOne, deleteOne}
