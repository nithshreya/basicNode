module.exports = (roles) => {
    return (req, res, next) => {
        if (!req.requesterDetails) {
            res.status(401).send({ error: 'you are not authorized to make this request' })
        }
        let role = req.requesterDetails.role
        if (roles.includes(role)) {
            next()
        } else {
            res.status(401).send({ error: 'you are not authorized to make this request' })
        }
    }
}