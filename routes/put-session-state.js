const updateState = require('../uc').updateState()

module.exports = (req, res) => {
    updateState(req.params.code, req.guestId, req.body)
    res.status(200).send()
}
