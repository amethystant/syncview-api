const express = require('express')
const https = require('https')
const fs = require('fs')

const registerRoutes = require('./routes')
const createWsServer = require('./ws/create-ws-server')

const app = express()

registerRoutes(app)

const httpsOptions = {
    pfx: fs.readFileSync('./cert.pfx'),
    passphrase: 'password'
}
const httpsServer = https.createServer(httpsOptions, app)
    .addListener('error', error => console.log(error))
    .addListener('listening', () => console.log('Listening.'))

createWsServer(httpsServer)
httpsServer.listen(443)
