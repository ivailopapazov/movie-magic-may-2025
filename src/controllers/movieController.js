import express from 'express'
import movieService from '../services/movieService.js';
import castService from '../services/castService.js';
import { getCategoryOptionsViewData } from '../utils/movieUtils.js';
import { isAuth } from '../middlewares/authMiddleware.js';
import { getErrorMessage } from '../utils/errorUtils.js';

const movieController = express.Router();

movieController.get('/create', isAuth, (req, res) => {
    res.render('movie/create');
});

movieController.post('/create', isAuth, async (req, res) => {
    // Get current userId
    const userId = req.user.id;

    // Get movie data
    const newMovie = req.body;

    try {
        // Save Movie
        await movieService.create(newMovie, userId);

        // Redirect to home page
        res.redirect('/');
    } catch (err) {
        // Prepare view data
        const categoryOptionsViewData = getCategoryOptionsViewData(newMovie.category);

        res.render('movie/create', {
            error: getErrorMessage(err),
            movie: newMovie,
            categoryOptions: categoryOptionsViewData,
        });
    }
});

movieController.get('/:movieId/details', async (req, res) => {
    // Get movie id from params
    const movieId = req.params.movieId;

    // Get current user
    const userId = req.user?.id;

    // Get movie data with populated casts
    const movie = await movieService.getOne(movieId);

    // Verify if user is owner
    const isOwner = movie.owner?.equals(userId);

    res.render('movie/details', { movie, isOwner, pageTitle: 'Details' });
});

movieController.get('/search', async (req, res) => {
    // Get querystring
    const filter = req.query;

    // Get all movies
    const movies = await movieService.getAll(filter);

    res.render('search', { movies, filter });
});

movieController.get('/:movieId/attach', isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    // Get movie by id
    const movie = await movieService.getOne(movieId);

    // get all casts
    const casts = await castService.getAll({ exclude: movie.casts });

    // Pass casts to template
    res.render('movie/attach', { movie, casts, pageTitle: 'Attach' });
});

movieController.post('/:movieId/attach', isAuth, async (req, res) => {
    // Get movie id
    const movieId = req.params.movieId;

    // Get cast id
    const castId = req.body.cast;

    // Attach cast to movie
    await movieService.attach(movieId, castId);

    // Redirect to movie details page
    res.redirect(`/movies/${movieId}/details`);
});

movieController.get('/:movieId/delete', isAuth, async (req, res) => {
    // Get movie Id
    const movieId = req.params.movieId;

    // call service
    await movieService.delete(movieId);

    // return redirect
    res.redirect('/');
});

movieController.get('/:movieId/edit', isAuth, async (req, res) => {
    // Get movie id
    const movieId = req.params.movieId;

    // Get movie by id
    const movie = await movieService.getOne(movieId);

    // Get userId
    const userId = req.user?.id;

    // check if owner
    const isOwner = movie.owner?.equals(userId);

    if (!isOwner) {
        // return res.render('404', { error: 'You don\' have access to edit this movie' });
        return res.dataRedirect('/404', { error: 'You don\' have access to edit this movie' });
    }

    // Prepare view data
    const categoryOptionsViewData = getCategoryOptionsViewData(movie.category);

    // Pass movie data to template    
    res.render('movie/edit', {
        movie,
        categoryOptions: categoryOptionsViewData,
        pageTitle: 'Edit'
    });
});

movieController.post('/:movieId/edit', isAuth, async (req, res) => {
    // Get movie id
    const movieId = req.params.movieId;

    // Get updated movie data
    const movieData = req.body;

    // Get userId
    // const userId = req.user?.id;
    // TODO: Check if owner

    // Update movie
    await movieService.update(movieId, movieData);

    // Redirect to movie details page
    res.redirect(`/movies/${movieId}/details`);
});

export default movieController;
