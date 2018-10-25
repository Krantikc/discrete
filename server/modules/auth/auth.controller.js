const AuthService = require('./auth.service');
const { UserController } = require('../user');

class AuthController {
  constructor() {
  }
  
  async register(req, res, next) {
    let user = await UserController.insert(req.body);
    user = user.toObject();
    delete user.hashedPassword;
    req.user = user;
    next();
  }

  login(req, res) {
    let user = req.user;
    let token = AuthService.generateToken(user);
    res.json({ user, token });
  }
}

module.exports =  new AuthController();
