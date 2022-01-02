const leaveSession = require('../uc').leaveSession()

module.exports = (req, res) => {
    leaveSession(req.params.code, req.guestId)
    res.status(200).send()
}
