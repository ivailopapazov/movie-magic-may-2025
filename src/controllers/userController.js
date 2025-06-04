import { Router } from 'express'

const userController = Router();

// TODO: Add actions
userController.get('/register', (req, res) => {
    res.send('Register page')
});

export default userController;

