const express = require('express')

const authenticateMw = require('../middleware/authenticate')
const corsMw = require('../middleware/cors')

const postSessionCreate = require('./post-session-create')
const postSessionAccess = require('./post-session-access')
const putGuestAdmit = require('./put-guest-admit')
const putSessionState = require('./put-session-state')
const getSessionState = require('./get-session-state')
const getSessionFileVerify = require('./get-session-file-verify')
const putGuestElevate = require('./put-guest-elevate')
const postGuestKick = require('./post-guest-kick')
const postSessionLeave = require('./post-session-leave')

module.exports = app => {
    app.options('/session/create', corsMw())
    app.post('/session/create', corsMw(), express.json(), postSessionCreate)
    app.options('/session/:code/access', corsMw())
    app.post('/session/:code/access', corsMw(), express.json(), postSessionAccess)
    app.options('/session/:code/guest/:guestId/admit', corsMw())
    app.put('/session/:code/guest/:guestId/admit', corsMw(), authenticateMw(), putGuestAdmit)
    app.options('/session/:code/state', corsMw())
    app.put('/session/:code/state', corsMw(), express.json(), authenticateMw(), putSessionState)
    app.get('/session/:code/state', corsMw(), authenticateMw(), getSessionState)
    app.options('/session/:code/file-verify', corsMw())
    app.get('/session/:code/file-verify', corsMw(), express.json(), authenticateMw(), getSessionFileVerify)
    app.options('/session/:code/guest/:guestId/elevate', corsMw())
    app.put('/session/:code/guest/:guestId/elevate', corsMw(), authenticateMw(), putGuestElevate)
    app.options('/session/:code/guest/:guestId/kick', corsMw())
    app.post('/session/:code/guest/:guestId/kick', corsMw(), authenticateMw(), postGuestKick)
    app.options('/session/:code/leave', corsMw())
    app.post('/session/:code/leave', corsMw(), authenticateMw(), postSessionLeave)
}
