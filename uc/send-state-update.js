module.exports = (viewState) => {

    return (session, guests) => {

        for (const guest of guests) {
            if (guest.ws) {
                let view = viewState(session.code, guest.id)
                guest.ws.send(JSON.stringify(view))
            }
        }
    }
}
