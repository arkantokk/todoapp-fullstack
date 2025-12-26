const Token = require('../models/Token');
const User = require('../models/User');
const tokenService = require('./token.service')
const bcrypt = require('bcryptjs');

class AuthService {
    async register(userData) {

        const candidateEmail = await User.findOne({ email: userData.email });
        const candidateUsername = await User.findOne({ username: userData.username })

        if (candidateEmail) {
            throw new Error('User with this email already exists');
        }
        if (candidateUsername) {
            throw new Error('User with this username already exists');
        }

        const user = await User.create(userData);

        const userDto = {
            id: user._id,
            email: user.email,
            username: user.username
        }
        const tokens = tokenService.generateTokens(userDto);
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        };
    }

    async login(loginInput, password) {

        const user = await User.findOne({
            $or: [
                { email: loginInput },
                { username: loginInput }
            ]
        });

        if (!user) {
            throw new Error('User not found');
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw new Error('Incorrect password');
        }

        const userDto = { id: user._id, email: user.email, username: user.username };
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

        const tokenFromDb = await Token.findOne({ refreshToken });

        if (!userData || !tokenFromDb) {
            throw new Error('unauthorized');
        }

        const user = await User.findById(userData.id);
        if (!user) {
            throw new Error('User not found'); // Або теж 'Unauthorized'
        }
        const userDto = { id: user._id, email: user.email, username: user.username };
        const tokens = tokenService.generateTokens(userDto);
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken) {
        if (!refreshToken) {
            console.log("error");
            throw new Error('unauthorized');
            
        }

        const token = await tokenService.removeToken(refreshToken);

        return {
            token
        }
    }
}

module.exports = new AuthService();