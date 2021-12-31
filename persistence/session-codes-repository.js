const codes = {}

function generateOne() {
    let code = ''
    while (code in codes) {
        code = ''
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        for (let i = 0; i < 6; i++) {
            code += characters.charAt(Math.random() * characters.length)
        }
    }

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
