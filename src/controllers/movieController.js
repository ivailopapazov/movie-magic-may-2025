import express from 'express'
import movieService from '../services/movieService.js';

const movieController = express.Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', async (req, res) => {
    const newMovie = req.body;

    // Save Movie
    await movieService.create(newMovie);

    // Redirect to home page
    res.redirect('/');
});

movieController.get('/:movieId/details', async (req, res) => {
    // Get movie id from params
    const movieId = req.params.movieId;
    
    // Get movie data
    const movie = await movieService.getOne(movieId);

    res.render('details', { movie });
});

movieController.get('/search', async (req, res) => {
    // Get querystring
    const filter = req.query;
    
    // Get all movies
    const movies = await movieService.getAll(filter);

    res.render('search', { movies, filter });
});

export default movieController;
