const viewState = require('../uc').viewState()

module.exports = (req, res) => {
    res.json(viewState(req.params.code, req.guestId))
}
