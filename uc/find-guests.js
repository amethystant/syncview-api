module.exports = () => {

    return (session, isHostsOnly) => {
        let result = []
        for (const guestId in session.guests) {
            let guest = session.guests[guestId]
            if (!isHostsOnly || guest.isHost) {
                result.push(guest)
            }
        }

        return result
    }
}
