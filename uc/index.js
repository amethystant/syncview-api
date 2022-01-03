const {SESSION_DURATION_MAX, SESSION_CLEANUP_INTERVAL} = require('../constants')
const sessionsDb = require('../persistence/sessions-db')
const sessionCodesRepo = require('../persistence/session-codes-repository')
const createSessionCleanUpRepo = require('../persistence/session-cleanup-repository')
const guestIdsRepo = require('../persistence/guest-ids-repository')
const validation = require('../validation')

const getFindSession = require('./find-session')
const getFindSessionWithGuests = require('./find-session-with-guests')
const getConstructGuest = require('./construct-guest')
const getCreateSession = require('./create-session')
const getViewState = require('./view-state')
const getSendStateUpdate = require('./send-state-update')
const getFindGuests = require('./find-guests')
const getAddGuest = require('./add-guest')
const getAdmitGuest = require('./admit-guest')
const getUpdateState = require('./update-state')
const getVerifyFile = require('./verify-file')
const getElevateGuest = require('./elevate-guest')
const getKickGuest = require('./kick-guest')
const getLeaveSession = require('./leave-session')
const getEndSession = require('./end-session')
const getConnectGuestWs = require('./connect-guest-ws')
const getCleanUpSessions = require('./clean-up-sessions')
const getScheduleSessionCleanups = require('./schedule-session-cleanups')

const sessionCleanUpRepo = createSessionCleanUpRepo(SESSION_DURATION_MAX, SESSION_CLEANUP_INTERVAL)

exports.findSession = () => getFindSession(sessionsDb)
exports.findSessionWithGuests = () => getFindSessionWithGuests(exports.findSession())
exports.constructGuest = () => getConstructGuest(guestIdsRepo, validation)
exports.createSession = () => getCreateSession(
    sessionsDb,
    sessionCodesRepo,
    sessionCleanUpRepo,
    validation,
    exports.constructGuest()
)
exports.viewState = () => getViewState(SESSION_DURATION_MAX, exports.findSessionWithGuests())
exports.sendStateUpdate = () => getSendStateUpdate(exports.viewState())
exports.findGuests = () => getFindGuests()
exports.addGuest = () => getAddGuest(
    validation,
    exports.findSession(),
    exports.constructGuest(),
    exports.findGuests(),
    exports.sendStateUpdate()
)
exports.admitGuest = () => getAdmitGuest(exports.findSessionWithGuests())
exports.updateState = () => getUpdateState(validation, exports.findSessionWithGuests())
exports.verifyFile = () => getVerifyFile(exports.findSessionWithGuests())
exports.elevateGuest = () => getElevateGuest(exports.findSessionWithGuests())
exports.kickGuest = () => getKickGuest(exports.findSessionWithGuests())
exports.endSession = () => getEndSession(sessionsDb)
exports.leaveSession = () => getLeaveSession(exports.findSessionWithGuests(), exports.endSession())
exports.connectGuestWs = () => getConnectGuestWs(exports.findSessionWithGuests())
exports.cleanUpSessions = () => getCleanUpSessions(
    SESSION_DURATION_MAX,
    sessionsDb,
    sessionCleanUpRepo,
    exports.endSession()
)
exports.scheduleSessionCleanups = () => getScheduleSessionCleanups(SESSION_CLEANUP_INTERVAL, exports.cleanUpSessions())
