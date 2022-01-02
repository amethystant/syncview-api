const verifyFile = require('../uc').verifyFile()

module.exports = (req, res) => {
    let result = verifyFile(req.params.code, req.guestId, req.body.fileDescription)
    res.status(200).json({
        result: result
    })
}
