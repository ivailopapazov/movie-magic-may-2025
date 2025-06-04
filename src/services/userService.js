import bcrypt from 'bcrypt'

import User from "../models/User.js"

export default {
    register(userData) {
        return User.create(userData);
    },
    async login(email, password) {
        // Get user from database
        const user = await User.find({email});

        // Check if user exists
        if (!user) {
            return new Error('No such user!');
        }

        // Validate password
        const isValid = await bcrypt.compare(password, user.password);

        // Return error if not valid
        if (!isValid) {
            return new Error('Invalid password');
        }

        // If valid generate token

        // Return token
        return '';
    },
}
