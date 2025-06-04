import { Router } from 'express'

import homeController from './controllers/homeController.js';
import movieController from './controllers/movieController.js';
import castController from './controllers/castController.js';
import userController from './controllers/userController.js';

const routes = Router();

// Config routes
routes.use(homeController);
routes.use('/movies', movieController);
routes.use('/casts', castController);
routes.use('/users', userController);
routes.all('*url', (req, res) => {
    res.render('404');
});

export default routes;
