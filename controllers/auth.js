const UserValidation = require("../validations/user");
const Auth = require("../models/auth");
const JwtHelper = require("../utils/jwtHelper");

module.exports = {
login: async (req, res, next) => {
    try {
      UserValidation.validateLogin(req.body);
      const { email, password } = req.body;
      const user = await Auth.login(email, password);
      const accessToken = JwtHelper.generateToken(user);

      return res.status(200).json({
        status: "Success",
        statusCode: 200,
        message: "Login berhasil.",
        data: {
          user,
          accessToken,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}