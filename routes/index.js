const express = require('express')

const authenticateMw = require('../middleware/authenticate')

const postSessionCreate = require('post-session-create')
const postSessionAccess = require('post-session-access')
const postGuestAdmit = require('post-guest-admit')
const putSessionState = require('put-session-state')
const getSessionState = require('get-session-state')

module.exports = app => {
    app.post('session/create', express.json(), postSessionCreate)
    app.post('session/:code/access', express.json(), postSessionAccess)
    app.post('session/:code/guest/:guestId/admit', authenticateMw(), postGuestAdmit)
    app.put('session/:code/state', express.json(), authenticateMw(), putSessionState)
    app.get('session/:code/state', authenticateMw(), getSessionState)
}
