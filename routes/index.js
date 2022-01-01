const express = require('express')

const sessionCodeVerifyMw = require('../middleware/session-code-verify')

const postSessionCreate = require('post-session-create')
const postSessionAccess = require('post-session-access')

module.exports = app => {
    app.post('session/create', express.json(), postSessionCreate)
    app.post('session/:code/access', express.json(), sessionCodeVerifyMw, postSessionAccess)
}
