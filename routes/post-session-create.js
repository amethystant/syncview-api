const createSession = require('../uc').createSession()
const {generateToken} = require('../auth')

module.exports = (req, res) => {
    let sessionCreationResult = createSession(
        req.body.name, // todo test what happens when param missing
        req.body.hostName,
        req.body.isWaitingRoom,
        req.body.isControlsAllowed,
        req.body.fileDescription
    )

    let token = generateToken(sessionCreationResult.host.id)

    res.status(201).json({
        sessionCode: sessionCreationResult.session.code,
        token: token
    })
}
