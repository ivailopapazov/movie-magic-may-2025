import express from 'express'
import movieService from '../services/movieService.js';

const movieController = express.Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', (req, res) => {
    const newMovie = req.body;

    // Save Movie
    movieService.create(newMovie);

    // Redirect to home page
    res.redirect('/');
});

movieController.get('/:movieId/details', (req, res) => {
    // Get movie id from params
    const movieId = req.params.movieId;

    // Get movie data
    const movie = movieService.getOne(movieId);

    res.render('details', { movie });
});

movieController.get('/search', (req, res) => {
    // Get all movies
    const movies = movieService.getAll();

    res.render('search', { movies });
});

export default movieController;
