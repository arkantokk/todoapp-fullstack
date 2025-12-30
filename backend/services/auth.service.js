const Token = require('../models/Token'); // Переконайся, що шлях правильний
const User = require('../models/User');
const tokenService = require('./token.service')
const bcrypt = require('bcryptjs');

class AuthService {
    async register(userData) {
        const candidateEmail = await User.findOne({ email: userData.email });
        const candidateUsername = await User.findOne({ username: userData.username })

        if (candidateEmail) throw new Error('User with this email already exists');
        if (candidateUsername) throw new Error('User with this username already exists');

        const user = await User.create(userData);
        const userDto = { id: user._id, email: user.email, username: user.username }

        const tokens = tokenService.generateTokens(userDto);

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }

    async login(loginInput, password) {
        const user = await User.findOne({
            $or: [{ email: loginInput }, { username: loginInput }]
        });

        if (!user) throw new Error('User not found');

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) throw new Error('Incorrect password');

        const userDto = { id: user._id, email: user.email, username: user.username };
        const tokens = tokenService.generateTokens(userDto);

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }

    async refresh(refreshToken) {
        if (!refreshToken) throw new Error('Unauthorized');


        const tokenFromDb = await tokenService.findToken(refreshToken);


        if (!tokenFromDb) throw new Error('Unauthorized');
        // grace period implementation to fix double refresh issue
        if (tokenFromDb.isUsed) {
            const timeDiff = Date.now() - new Date(tokenFromDb.usedAt).getTime();
            if (timeDiff < 15000) {
                const userData = tokenService.validateRefreshToken(refreshToken);


                let userId = userData ? userData.id : tokenFromDb.user;

                const user = await User.findById(userId);
                const userDto = { id: user._id, email: user.email, username: user.username };
                const tokens = tokenService.generateTokens(userDto);

                await tokenService.saveToken(userDto.id, tokens.refreshToken);

                return { ...tokens, user: userDto };
            } else {

                await tokenService.removeAllUserTokens(tokenFromDb.user);
                throw new Error('Security Alert: Refresh token reuse detected');
            }
        }


        const userData = tokenService.validateRefreshToken(refreshToken);
        if (!userData) {

            await tokenService.removeToken(refreshToken);
            throw new Error('Unauthorized');
        }

        const user = await User.findById(userData.id);
        if (!user) throw new Error('User not found');

        const userDto = { id: user._id, email: user.email, username: user.username };
        const tokens = tokenService.generateTokens(userDto);


        await tokenService.markTokenAsUsed(tokenFromDb._id);


        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }

    async logout(refreshToken) {
        if (!refreshToken) throw new Error('Unauthorized');
        const token = await tokenService.removeToken(refreshToken);
        return { token }
    }
}

module.exports = new AuthService();