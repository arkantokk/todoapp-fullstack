const { validationResult } = require('express-validator');
const authService = require('../services/auth.service');



class AuthContoller {
    async register(req, res) {
        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "Incorrect request",
                    errors: errors.array()
                });
            }

            const { email, password } = req.body;

            const userData = await authService.register({ email, password });

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                // secure: true
            })

            res.status(201).json({
                accessToken: userData.accessToken,
                user: userData.user
            });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: err.message })
        }
    }

    async login(req, res) {
        try {

            const { email, password } = req.body;

            const userData = await authService.login(email, password);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                // secure: true
            });

            res.status(201).json({
                accessToken: userData.accessToken,
                user: userData.user
            });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: err.message })
        }
    }

    async refresh(req, res) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await authService.refresh(refreshToken);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
                // secure: true (для https)
            })

            return res.status(200).json({
                accessToken: userData.accessToken,
                userData: userData.user
            })
        } catch (error) {
            console.log(error);
            return res.status(401).json({message:"unatuhoras" , error: error.message})
        }

    }
}

module.exports = new AuthContoller();