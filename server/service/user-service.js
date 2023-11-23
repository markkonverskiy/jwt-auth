const bcrypt = require("bcrypt");
const { User } = require("../models/models");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");

class UserService {
  async registration(email, password) {
    const candiate = await User.findOne({ where: { email } });
    if (candiate) {
      throw new Error("User with this email already exists");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashPassword,
    });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User with this email was not found");
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      throw new Error("Invalid password");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async checkAuth() {
    const user = await User.findOne({ where: { email } });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return tokens.accessToken;
  }

  async refresh(refreshToken) {
    try {
      if (!refreshToken) {
        throw new Error("token error");
      }
      const userData = tokenService.validateRefreshToken(refreshToken);
      const tokenFromDb = await tokenService.findToken(refreshToken);

      if (!userData || !tokenFromDb) {
        throw new Error("Not authorized");
      }

      const user = await User.findByPk(userData.id);
      const userDto = new userDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      return {
        ...tokens,
        user: userDto,
      };
    } catch (error) {
      console.log("Error in refresh:", error);
    }
  }
}

module.exports = new UserService();
