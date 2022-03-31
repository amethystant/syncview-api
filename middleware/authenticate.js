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

        let tokenDecoded
        try {
            tokenDecoded = auth.authenticateToken(token)
        } catch (e) {
            throwErr()
        }

        if (typeof tokenDecoded !== 'string' && typeof tokenDecoded !== 'number') {
            throwErr()
        }
        req.guestId = tokenDecoded
        next()
    }
}
