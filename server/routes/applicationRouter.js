const Router = require('express');
const router = new Router();
const applicationController = require('../controllers/applicationController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

router.get('/', authMiddleware, applicationController.getAll);
router.get('/:id', authMiddleware, applicationController.getByUser);
router.post('/', authMiddleware, applicationController.createApplication)
router.patch('/', authMiddleware, applicationController.updateStatusApplication);

module.exports = router;