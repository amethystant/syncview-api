const {AuthorizationError} = require('../error')
const {Position} = require('../model/position')

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
            session.actions.push({
                initiator: guestId,
                field: 'name',
                value: name,
                actionTs: Date.now()
            })
        }

        if (typeof isWaitingRoom == 'boolean') {
            session.isWaitingRoom = isWaitingRoom
            session.actions.push({
                initiator: guestId,
                field: 'isWaitingRoom',
                value: isWaitingRoom,
                actionTs: Date.now()
            })
        }

        if (typeof isControlsAllowed == 'boolean') {
            session.isControlsAllowed = isControlsAllowed
            session.actions.push({
                initiator: guestId,
                field: 'isControlsAllowed',
                value: isControlsAllowed,
                actionTs: Date.now()
            })
        }

        if (typeof isPlaying == 'boolean') {
            session.isPlaying = isPlaying
            session.actions.push({
                initiator: guestId,
                field: 'isPlaying',
                value: isPlaying,
                actionTs: Date.now()
            })
        }

        if (position) {
            session.position = new Position(position.position, Date.now())
            session.actions.push({
                initiator: guestId,
                field: 'position',
                value: session.position,
                actionTs: Date.now()
            })
        }
    }
}
