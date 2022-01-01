const express = require('express')

const authenticateMw = require('../middleware/authenticate')

const postSessionCreate = require('post-session-create')
const postSessionAccess = require('post-session-access')
const postGuestAdmit = require('post-guest-admit')

module.exports = app => {
    app.post('session/create', express.json(), postSessionCreate)
    app.post('session/:code/access', express.json(), postSessionAccess)
    app.post('session/:code/guest/:guestId/admit', authenticateMw(), postGuestAdmit)
}
