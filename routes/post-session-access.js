const addGuest = require('../uc').addGuest()
const {generateToken} = require('../auth')

module.exports = (req, res) => {
    let guest = addGuest(req.body.guestName, req.params.code)
    let token = generateToken(guest.id)
    res.status(201).json({
        token: token,
        isAwaitingAdmission: guest.isAwaitingAdmission
    })
}
