const addGuest = require('../uc').addGuest()
const validation = require('../validation')
const {generateToken} = require('../auth')

module.exports = (req, res) => {
    let guestName = validation.guestName(req.body.guestName)
    let sessionCode = req.params.code

    let guest = addGuest(guestName, sessionCode)

    let token = generateToken(guest.id)
    res.status(201).json({
        token: token,
        isAwaitingAdmission: guest.isAwaitingAdmission
    })
}
