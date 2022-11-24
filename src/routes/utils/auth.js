const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || "this is a secret";
const auth = (req, res, next) => {
    try {
        const authStr = req.headers.authorization;
        if (!authStr) {
            res.status(401).json({
                status: 'failed',
                message: 'this is a protected endpoint provide non empty token',
            });
            return;
        }

        const accessToken = authStr.split(' ')[1]; // Bearer <accessToken>
        const decoded = jwt.verify(accessToken, SECRET);
        req.tokenPayload = { email: decoded.email, id: decoded.id };
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            res.status(401).json({
                status: 'failed',
                message: 'expired token',
            });
            return;
        }

        if (err.name === 'JsonWebTokenError') {
            res.status(401).json({
                status: 'failed',
                message: 'token malformed',
            });
            return;
        }

        if (err.name === 'NotBeforeError') {
            res.status(401).json({
                status: 'failed',
                message: 'token not active',
            });
            return;
        }

        console.log('auth middleware:: ', err, req.headers);
        res.status(500).json({
            status: 'failed',
            message: 'server Error',
        });
    }
};

module.exports = auth;
