import { Router } from 'express'
import userService from '../services/userService.js';
import { getErrorMessage } from '../utils/errorUtils.js';

const userController = Router();

userController.get('/register', (req, res) => {
    res.render('user/register');
});

userController.post('/register', async (req, res) => {
    // Get Data from request
    const { email, password, rePassword } = req.body;

    // Register user
    try {
        const token = await userService.register({ email, password, rePassword });

        // Set auth cookie
        res.cookie('auth', token);

        // Redirect to login
        res.redirect('/');
    } catch (err) {
        res.render('user/register', { error: getErrorMessage(err), email });
    }
});

userController.get('/login', (req, res) => {
    res.render('user/login');
});

userController.post('/login', async (req, res) => {
    // Get login data
    const { email, password } = req.body;

    try {
        // call service login
        const token = await userService.login(email, password);

        // Set auth cookie
        res.cookie('auth', token);

        // redirect to home
        res.redirect('/');
    } catch (err) {
        res.render('user/login', { error: err.message, email });
    }

});

userController.get('/logout', (req, res) => {
    res.clearCookie('auth');

    // TODO: Invalidate token

    res.redirect('/');
});

export default userController;

