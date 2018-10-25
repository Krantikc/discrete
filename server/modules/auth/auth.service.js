const jwt = require('jsonwebtoken');
const config = require('../../config/config');

class AuthService {
    generateToken(user) {
        //user.exp = config.tokenExpiration;
        const payload = JSON.stringify(user);
        return jwt.sign(user, config.jwtSecret, {expiresIn: config.tokenExpiration});
    }
}

module.exports = new AuthService();


