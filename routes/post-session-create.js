const createSession = require('../uc').createSession()
const {generateToken} = require('../auth')

module.exports = (req, res) => {
    let session = createSession(
        req.body.name, // todo test what happens when param missing
        req.body.hostName,
        req.body.isWaitingRoom,
        req.body.isControlsAllowed,
        req.body.fileDescription
    )

    let token = generateToken(session.guests[0].id)

    res.status(201).json({
        sessionCode: session.code,
        token: token
    })
}
