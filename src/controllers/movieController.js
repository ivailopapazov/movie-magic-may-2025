import express from 'express'

const movieController = express.Router();

movieController.get('/create', (req, res) => {
    res.render('create'); 
});

export default movieController;
