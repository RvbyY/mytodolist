const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token)
        return res.status(401).json({msg: "No token, authorization denied"});
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = { id: decoded.id };
        next();
    } catch(err) {
        console.error(err);
        res.status(401).json({msg: 'Token is not valid'});
    }
};

module.exports = verifyToken;
