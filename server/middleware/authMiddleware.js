const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {

        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({message: 'Не авторизован'});
        }

        const decoded = jwt.verify(token, String(process.env.SECRET_KEY)); // проверяет токен на валидность
        req.user = decoded;
        next();

    } catch (e) {
        res.status(401).json({message: 'Не авторизован'});
    }
};