import express from 'express';

const homeController = express.Router();

homeController.get('/', (req, res) => {
    res.render('home');
});

homeController.get('/about', (req, res) => {
    res.render('about');
});

export default homeController;
