const express = require('express')

const authenticateMw = require('../middleware/authenticate')

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
    app.post('/session/create', express.json(), postSessionCreate)
    app.post('/session/:code/access', express.json(), postSessionAccess)
    app.put('/session/:code/guest/:guestId/admit', authenticateMw(), putGuestAdmit)
    app.put('/session/:code/state', express.json(), authenticateMw(), putSessionState)
    app.get('/session/:code/state', authenticateMw(), getSessionState)
    app.get('/session/:code/file-verify', express.json(), authenticateMw(), getSessionFileVerify)
    app.put('/session/:code/guest/:guestId/elevate', authenticateMw(), putGuestElevate)
    app.post('/session/:code/guest/:guestId/kick', authenticateMw(), postGuestKick)
    app.post('/session/:code/leave', authenticateMw(), postSessionLeave)
}
