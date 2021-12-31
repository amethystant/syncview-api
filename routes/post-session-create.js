const createSession = require('../uc').createSession()
const {generateToken} = require('../auth')

module.exports = (req, res) => {
    let session = createSession( // todo add data validation
        req.name,
        req.hostName,
        req.isWaitingRoom,
        req.isControlsAllowed,
        req.fileDescription
    )

    let token = generateToken(session.guests[0].id)

    res.status(201).json({
        sessionCode: session.code,
        token: token
    })
}
