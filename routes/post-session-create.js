const validation = require('../validation')
const createSession = require('../uc').createSession()
const {generateToken} = require('../auth')

module.exports = (req, res) => {
    let session = createSession(
        validation.sessionName(req.body.name),
        validation.guestName(req.body.hostName),
        validation.boolean(req.body.isWaitingRoom),
        validation.boolean(req.body.isControlsAllowed),
        req.body.fileDescription
    )

    let token = generateToken(session.guests[0].id)

    res.status(201).json({
        sessionCode: session.code,
        token: token
    })
}
