const jwt = require("jsonwebtoken");
const { Token } = require("../models/models");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_KEY, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken) {
    let tokenData = await Token.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      await tokenData.save();
    } else {
      tokenData = await Token.create({ user: userId, refreshToken });
    }
    return tokenData;
  }

  async removeToken(refreshToken) {
    const tokenData = await Token.destroy({
      where: { refreshToken },
    });
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await Token.findOne({ where: { refreshToken } });
    return tokenData;
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.SECRET_KEY);
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.REFRESH_KEY);
      return userData;
    } catch (error) {
      return null;
    }
  }
}

module.exports = new TokenService();
