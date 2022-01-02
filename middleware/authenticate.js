const auth = require('../auth')

module.exports = () => {
    return (req, res, next) => {
        const throwErr = () => {
            let err = new Error('Unauthenticated.')
            err.statusCode = 401
            throw err
        }

        let token
        try {
            token = req.get('Authorization').split(' ')[1]
        } catch (e) {
            throwErr()
        }

        let tokenDecoded = auth.authenticateToken(token)
        if (typeof tokenDecoded !== 'string' && typeof tokenDecoded !== 'number') {
            throwErr()
        }
        req.guestId = tokenDecoded
        next()
    }
}
