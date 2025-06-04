import jsonwebtoken from 'jsonwebtoken'

import { jwtSecret } from "../config/general.js";

export function generateAuthToken(user) {
    const payload = {
        id: user.id,
        email: user.email,
    };

    // TODO: make it async
    const token = jsonwebtoken.sign(payload, jwtSecret, { expiresIn: '2h' });

    return token;
}
