const express = require('express')
const ws = require('ws')
const https = require('https')
const fs = require('fs')
const registerRoutes = require('routes')

const app = express()

registerRoutes(app)
app.get('/test', (req, res) => {
    res.send(req.query['q'])
})

const server = https.createServer({
    pfx: fs.readFileSync('./cert.pfx'),
    passphrase: 'password'
}, app)
    .addListener('error', error => {
        console.log(error)
    })
    .addListener('listening', () => {
        console.log('Listening.')
    })

const wsServer = new ws.Server({ noServer: true })
wsServer.on('connection', socket => {
    let id = Math.random()
    socket.on('message', message => console.log(id.toString() + ' ' + message.toString()))
})

server.listen(443)

server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit('connection', socket, request)
    })
})
