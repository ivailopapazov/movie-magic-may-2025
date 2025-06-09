import bcrypt from 'bcrypt'

import User from "../models/User.js"
import { generateAuthToken } from '../utils/authUtils.js';

export default {
    async register(userData) {
        const existingUser = await User.findOne({ email: userData.email })
        if (existingUser) {
            throw new Error('User already exists');
        }
        const user = await User.create(userData);

        const token = generateAuthToken(user);

        return token;
    },
    async login(email, password) {
        // Get user from database
        const user = await User.findOne({ email });

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
        const token = generateAuthToken(user);

        // Return token
        return token;
    },
}
