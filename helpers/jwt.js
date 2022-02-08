const expressJwt = require('express-jwt'),
    dotenv = require('dotenv'),
    user = require('../controller/user.js');
dotenv.config();

const jwt = () => {
    const secret = process.env.JWT_SECRET;
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            // '/user/authenticate',
            '/user/register',
            '/signup',
            '/signin', '/', '/user/getall', '/messages', '/chats',
            '/newmessages',
            '/messagesByUser/ALI',
            '/messagesByUser/Zagham',
        ]
    });
}

const isRevoked = async (req, payload, done) => {
    try {
        const user = await user.getById(payload.sub);

        // revoke token if user no longer exists
        if (!user) {
            return done(null, true);
        }

        done();
    } catch (err) {
        console.log(err)
    }
};

module.exports = { jwt };
