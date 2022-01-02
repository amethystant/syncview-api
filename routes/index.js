const express = require('express')

const authenticateMw = require('../middleware/authenticate')

const postSessionCreate = require('./post-session-create')
const postSessionAccess = require('./post-session-access')
const putGuestAdmit = require('./put-guest-admit')
const putSessionState = require('./put-session-state')
const getSessionState = require('./get-session-state')
const getSessionFileVerify = require('./get-session-file-verify')
const putGuestElevate = require('./put-guest-elevate')
const putGuestKick = require('./put-guest-kick')
const postSessionLeave = require('./post-session-leave')

// todo figure out how to make express not return call stack for errors
module.exports = app => {
    app.post('/session/create', express.json(), postSessionCreate)
    app.post('/session/:code/access', express.json(), postSessionAccess)
    app.put('/session/:code/guest/:guestId/admit', authenticateMw(), putGuestAdmit)
    app.put('/session/:code/state', express.json(), authenticateMw(), putSessionState)
    app.get('/session/:code/state', authenticateMw(), getSessionState)
    app.get('/session/:code/file-verify', express.json(), authenticateMw(), getSessionFileVerify)
    app.put('/session/:code/guest/:guestId/elevate', authenticateMw(), putGuestElevate)
    app.put('/session/:code/guest/:guestId/kick', authenticateMw(), putGuestKick)
    app.put('/session/:code/leave', authenticateMw(), postSessionLeave)
}
