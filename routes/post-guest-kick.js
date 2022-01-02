const kickGuest = require('../uc').kickGuest()

module.exports = (req, res) => {
    kickGuest(req.params.code, req.guestId, req.params.guestId)
    res.status(201).send()
}
