import jsonwebtoken from 'jsonwebtoken'
import { jwtSecret } from '../config/general.js';

export const auth = (req, res, next) => {
    const token = req.cookies['auth'];

    if (!token) {
        return next();
    }

    try {
        const { id, email } = jsonwebtoken.verify(token, jwtSecret)

        req.user = { id, email };

        next();
    } catch (err) {
        res.clearCookie('auth');
        res.redirect('/users/login');
    }
};
