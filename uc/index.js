const sessionsDb = require('persistence/sessions-db')
const sessionCodesRepo = require('persistence/session-codes-repository')
const guestIdsRepo = require('persistence/guest-ids-repository')

const getCreateSession = require('create-session')
const getConstructGuest = require('construct-guest')

module.exports = {
    constructGuest: () => getConstructGuest(guestIdsRepo),
    createSession: () => getCreateSession(sessionsDb, this.constructGuest(), sessionCodesRepo)
}
