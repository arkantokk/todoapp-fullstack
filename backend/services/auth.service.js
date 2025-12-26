const Token = require('../models/Token');
const User = require('../models/User');
const tokenService = require('./token.service')
const bcrypt = require('bcryptjs');

class AuthService {
    async register(userData) {

        const candidate = await User.findOne({ email: userData.email });

        if (candidate) {
            throw new Error('User with this email already exists');
        }

        const user = await User.create(userData);

        const userDto = {
            id: user._id,
            email: user.email
        }
        const tokens = tokenService.generateTokens(userDto);
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        };
    }

    async login(email, password) {

        const user = await User.findOne({ email })
        if (!user) {
            throw new Error('User not found');
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw new Error('Incorrect password');
        }

        const userDto = { id: user._id, email: user.email };
        const tokens = tokenService.generateTokens(userDto);

        await tokenService.saveToken(userDto.id, tokens.refreshToken);


        return {
            ...tokens,
            user: userDto
        }

    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new Error('unauthorized');
        }

        const userData = tokenService.validateRefreshToken(refreshToken);

        const tokenFromDb = await Token.findOne({refreshToken});

        if (!userData || !tokenFromDb) {
            throw new Error('unauthorized');
        }

        const user = await User.findById(userData.id);
        if (!user) {
            throw new Error('User not found'); // Або теж 'Unauthorized'
        }
        const userDto = { id: user._id, email: user.email };
        const tokens = tokenService.generateTokens(userDto);
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }
}

module.exports = new AuthService();