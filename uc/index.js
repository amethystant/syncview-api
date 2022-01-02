const {SESSION_DURATION_MAX} = require('../constants')
const sessionsDb = require('persistence/sessions-db')
const sessionCodesRepo = require('persistence/session-codes-repository')
const guestIdsRepo = require('persistence/guest-ids-repository')
const validation = require('../validation')

const getFindSession = require('find-session')
const getFindSessionWithGuests = require('find-session-with-guests')
const getCreateSession = require('create-session')
const getConstructGuest = require('construct-guest')
const getAddGuest = require('add-guest')
const getAdmitGuest = require('admit-guest')
const getUpdateState = require('update-state')
const getViewState = require('view-state')
const getVerifyFile = require('verify-file')
const getElevateGuest = require('elevate-guest')
const getKickGuest = require('kick-guest')
const getLeaveSession = require('leave-session')

module.exports = {
    findSession: () => getFindSession(sessionsDb),
    findSessionWithGuests: () => getFindSessionWithGuests(this.findSession()),
    constructGuest: () => getConstructGuest(guestIdsRepo, validation),
    createSession: () => getCreateSession(sessionsDb, sessionCodesRepo, validation, this.constructGuest()),
    addGuest: () => getAddGuest(validation, this.findSession(), this.constructGuest()),
    admitGuest: () => getAdmitGuest(this.findSessionWithGuests()),
    updateState: () => getUpdateState(validation, this.findSessionWithGuests()),
    viewState: () => getViewState(SESSION_DURATION_MAX, this.findSessionWithGuests()),
    verifyFile: () => getVerifyFile(this.findSessionWithGuests()),
    elevateGuest: () => getElevateGuest(this.findSessionWithGuests()),
    kickGuest: () => getKickGuest(this.findSessionWithGuests()),
    leaveSession: () => getLeaveSession(this.findSessionWithGuests())
}
