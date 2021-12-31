const express = require('express')

const postSessionCreate = require('post-session-create')

module.exports = app => {
    app.post('session/create', express.json(), postSessionCreate)

}
