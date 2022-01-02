const admitGuest = require('../uc').admitGuest()

module.exports = (req, res) => {
    admitGuest(req.params.code, req.guestId, req.params.guestId)
    res.status(200).send()
}
