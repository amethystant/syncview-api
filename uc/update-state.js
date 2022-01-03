const {AuthorizationError} = require('../error')
const {Position} = require('../model/position')
const {Action} = require('../model/action')

module.exports = (validation, findSessionWithGuests) => {

    return (sessionCode, guestId, state) => {
        let session = findSessionWithGuests(sessionCode, [guestId])
        let guest = session.guests[guestId]

        if (!guest.isHost && (!session.isControlsAllowed || guest.isAwaitingAdmission)) {
            throw new AuthorizationError('Controls not granted.')
        }

        if (!guest.isHost) {
            const hostOnlyFields = [
                'name',
                'isWaitingRoom',
                'isControlsAllowed'
            ]
            for (let fieldName of hostOnlyFields) {
                if (fieldName in state) {
                    throw new AuthorizationError('Not authorized.')
                }
            }
        }

        let name = 'name' in state ? validation.sessionName(state.name) : undefined
        let isWaitingRoom = 'isWaitingRoom' in state ? validation.boolean(state.isWaitingRoom) : undefined
        let isControlsAllowed = 'isControlsAllowed' in state ? validation.boolean(state.isControlsAllowed) : undefined
        let isPlaying = 'isPlaying' in state ? validation.boolean(state.isPlaying) : undefined
        let position = 'position' in state ? validation.position(state.position) : undefined

        if (name) {
            session.name = name
            session.actions.push(new Action(guestId, 'name', name, Date.now()))
        }

        if (typeof isWaitingRoom == 'boolean') {
            session.isWaitingRoom = isWaitingRoom
            session.actions.push(new Action(guestId, 'isWaitingRoom', isWaitingRoom, Date.now()))
        }

        if (typeof isControlsAllowed == 'boolean') {
            session.isControlsAllowed = isControlsAllowed
            session.actions.push(new Action(guestId, 'isControlsAllowed', isControlsAllowed, Date.now()))
        }

        if (typeof isPlaying == 'boolean') {
            session.isPlaying = isPlaying
            session.actions.push(new Action(guestId, 'isPlaying', isPlaying, Date.now()))
        }

        if (position) {
            session.position = new Position(position.position, Date.now())
            session.actions.push(new Action(guestId, 'position', session.position, Date.now()))
        }
    }
}
