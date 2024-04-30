const ApiError = require('../error/ApiError.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Users} = require('../models/models.js');
const { SECRET_KEY } = require('../const.js');

const generateJwt = (id, fio, login, phone, email, password, role) => {
    return jwt.sign(
                {id, fio, login, phone, email, password, role}, 
                String(SECRET_KEY),
                {expiresIn: '24h'}
            );
}

class UserController {
    async registration(req, res, next) {
        const {email, password, fio, phone, login} = req.body;
        if (!email || !password || !phone || !login || !fio) {
            return next(ApiError.badRequest('Не заполнены обязательные поля'));
        }
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'));
        }

        const candidate = await Users.findOne({where: {email}});
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await Users.create({fio, login, phone, email, password: hashPassword});
        const token = generateJwt(user.id, user.fio, user.login, user.phone, user.email, user.password, user.role);

        return res.json({token}); 
    }

    async login(req, res, next) {
        const {login, password} = req.body;
        if (!login || !password) {
            return next(ApiError.badRequest('Не заполнены обязательные поля'));
        }
        const user = await Users.findOne({where: {login}});
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'));       
        }

        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'));        
        }

        const token = generateJwt(user.id, user.fio, user.login, user.phone, user.email, user.password, user.role);

        return res.json({token});
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.fio, req.user.login, req.user.phone, req.user.email, req.user.password, req.user.role);
        return res.json({token});
    }
}

module.exports = new UserController();