const ApiError = require('../error/ApiError.js');
const {Application, Users} = require('../models/models.js');

class ApplicationController {
    async getAll(req, res, next) {
        const application = await Application.findAll();
        return res.json({application}); 
    }

    async getByUser(req, res, next) {
        const {id} = req.params;
        if (!id) {
            return next(ApiError.badRequest('Не указан идентификатор пользователя'));
        }
        const user = await Users.findOne({where: {id}});
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'));       
        }

        const application = await Application.findAll({where: {userId: user.id}});
        
        return res.json({application});
    }

    async createApplication(req, res, next) {
        const {carNumber, description, userId} = req.body;

        if (!carNumber || !description) {
            return next(ApiError.badRequest('Не заполнены обязательные поля'));
        }

        const application = await Application.create({carNumber, description, status: 'В ожидании', userId})

        return res.json({application}); 
    }

    async updateStatusApplication(req, res, next) {
        const {carNumber, isAccepted} = req.body;
        if (!carNumber) {
            return next(ApiError.badRequest('Не указан номер машины'));
        }

        const application = await Application.update({status: isAccepted ? 'Принят' : 'Отклонен'}, {where: {carNumber}})

        return res.json({application})
    }
}

module.exports = new ApplicationController();