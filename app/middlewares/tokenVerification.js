const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (!err) {
                req.requesterDetails = decoded
            }
        })
    }
    next()
}