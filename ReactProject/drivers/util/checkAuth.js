const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        //Checking if authorization token is provided
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({
                "errors": [{
                    "msg": "No token, authorization denied"
                }]
            });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            errors: [{
                msg: 'Authentication failed, token not valid'
            }]
        });

        //next(error)
    }
};