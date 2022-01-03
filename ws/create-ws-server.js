const ws = require('ws')

const connectGuestWs = require('../uc').connectGuestWs()
const auth = require('../auth')

module.exports = (httpsServer) => {

    const wsServer = new ws.WebSocketServer({noServer: true})
    wsServer.on('connection', (ws, req) => {
        // todo refuse connection if not authorized
        try {
            let url = new URL(req.url, `https://${req.headers.host}`)
            let token = url.searchParams.get('token')

            let code = url.pathname.replace('/', '')
            let guestId = auth.authenticateToken(token)

            connectGuestWs(code, guestId, ws)
        } catch (e) {
            ws.close()
            console.log(`Error connecting ws: ${e}`)
        }
    })

    httpsServer.on('upgrade', (request, socket, head) => {
        wsServer.handleUpgrade(request, socket, head, socket => {
            wsServer.emit('connection', socket, request)
        })
    })

    return wsServer
}
