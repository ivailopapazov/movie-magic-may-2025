import { Router } from 'express'
import userService from '../services/userService.js';

const userController = Router();

userController.get('/register', (req, res) => {
    res.render('user/register');
});

userController.post('/register', async (req, res) => {
    // Get Data from request
    const userData = req.body;
    
    // Register user
    await userService.register(userData);

    // Redirect to login
    res.redirect('/users/login');
});

export default userController;

