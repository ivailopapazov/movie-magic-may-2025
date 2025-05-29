import express from 'express'
import movieService from '../services/movieService.js';
import castService from '../services/castService.js';

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

    res.render('movie/details', { movie });
});

movieController.get('/search', async (req, res) => {
    // Get querystring
    const filter = req.query;

    // Get all movies
    const movies = await movieService.getAll(filter);

    res.render('search', { movies, filter });
});

movieController.get('/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;

    // Get movie by id
    const movie = await movieService.getOne(movieId);
    
    // get all casts
    const casts = await castService.getAll();

    // Pass casts to template
    res.render('movie/attach', { movie, casts });
});

movieController.post('/:movieId/attach', async (req, res) => {
    // Get movie id
    const movieId = req.params.movieId;

    // Get cast id
    const castId = req.body.cast;

    // Attach cast to movie
    await movieService.attach(movieId, castId);

    // Redirect to movie details page
    res.redirect(`/movies/${movieId}/details`);
}); 

export default movieController;
