const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }

    try {

        if (!req.headers.authorization) {
            return res.status(401).json({ message: "Not authorized (header missing)" });
        }

        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = decoded;

        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Not authorized (invalid token)" });
    }
}