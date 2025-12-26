const jwt = require('jsonwebtoken');
const TokenModel = require('../models/Token')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await TokenModel.findOne({ user: userId });

        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await TokenModel.create({ user: userId, refreshToken });

        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await TokenModel.findOneAndDelete({ refreshToken: refreshToken });

        return tokenData;
    }

    validateRefreshToken(token) {

        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        } catch (error) {
            return null;
        }
    }

    async findToken(refreshToken) {
        try {
            const token = await TokenModel.findOne({ refreshToken });
            return token;
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new TokenService();