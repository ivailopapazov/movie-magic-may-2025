import User from "../models/User.js"

export default {
    register(userData) {
        return User.create(userData);
    },
    async login(loginData) {
        // Get user from database

        // Check if user exists

        // Validate password

        // Return error if not valid

        // If valid generate token

        // Return token
        return '';
    },
}
