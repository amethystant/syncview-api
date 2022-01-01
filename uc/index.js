const sessionsDb = require('persistence/sessions-db')
const sessionCodesRepo = require('persistence/session-codes-repository')
const guestIdsRepo = require('persistence/guest-ids-repository')
const validation = require('../validation')

const getFindSession = require('find-session')
const getFindSessionWithGuests = require('uc/find-session-with-guests')
const getCreateSession = require('create-session')
const getConstructGuest = require('construct-guest')
const getAddGuest = require('add-guest')
const getAdmitGuest = require('admit-guest')

module.exports = {
    findSession: () => getFindSession(sessionsDb),
    findSessionWithGuests: () => getFindSessionWithGuests(this.findSession()),
    constructGuest: () => getConstructGuest(guestIdsRepo, validation),
    createSession: () => getCreateSession(sessionsDb, sessionCodesRepo, validation, this.constructGuest()),
    addGuest: () => getAddGuest(validation, this.findSession(), this.constructGuest()),
    admitGuest: () => getAdmitGuest(this.findSessionWithGuests())
}
