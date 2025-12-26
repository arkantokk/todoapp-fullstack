const Router = require('express');
const router = new Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const {check} = require('express-validator');

router.post(
    '/registration',
    [
        check('email','Uncorrect email').isEmail(),
        check('password', 'Password must be longer than 5 characters').isLength({min: 5}),
        check('username', 'Username cannot be empty').notEmpty()
    ],
     authController.register);

router.post('/login', authController.login);
router.get('/refresh', authController.refresh)
router.post('/logout', authController.logout)


module.exports = router;