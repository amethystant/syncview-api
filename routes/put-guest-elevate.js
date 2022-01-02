const elevateGuest = require('../uc').elevateGuest()

module.exports = (req, res) => {
    elevateGuest(req.params.code, req.guestId, req.params.guestId)
    res.status(200).send()
}
