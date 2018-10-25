const UserService = require('./user.service');

class UserController {
  insert(user) {
    return UserService.insert(user);
  }
  
  list(req, resp) {
    return UserService.list(req, resp);
  }
  
  getByEmail(req, resp) {
    return UserService.getByEmail(req, resp);
  }
}

module.exports = new UserController();
