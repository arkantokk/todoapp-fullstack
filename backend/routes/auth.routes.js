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
router.get('/refresh', authController.refresh);
router.post('/logout', authController.logout);
router.post('/changepassword',[
    check('newPassword', 'New password must be longer than 5 symbols').isLength({ min: 5 }),
    check('currentPassword', 'Current password is required').notEmpty()
], authController.changePassword)

module.exports = router;