const jwt = require('jsonwebtoken');
const TokenModel = require('../models/Token')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' }); // Access живе мало
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const token = await TokenModel.create({ user: userId, refreshToken });
        return token;
    }


    async markTokenAsUsed(tokenId) {
        return await TokenModel.findByIdAndUpdate(tokenId, {
            isUsed: true,
            usedAt: new Date()
        });
    }

    async removeToken(refreshToken) {
        const tokenData = await TokenModel.findOneAndDelete({ refreshToken });
        return tokenData;
    }
    

    async removeAllUserTokens(userId) {
        return await TokenModel.deleteMany({ user: userId });
    }

    validateRefreshToken(token) {
        
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        } catch (error) {
            return null;
        }
    }

    async findToken(refreshToken) {
        const token = await TokenModel.findOne({ refreshToken });
        return token;
    }
}

module.exports = new TokenService();