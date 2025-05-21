import Movie, { movies } from '../models/Movie.js';

export default {
    getAll(filter = {}) {
        let result = movies.slice();

        if (filter.search) {
            result = result.filter(movie => movie.title.toLowerCase().includes(filter.search.toLowerCase()));
        }

        if (filter.genre) {
            // result = result.filter(movie => movie.genre.localeCompare(filter.genre, undefined, { sensitivity: 'accent' }) === 0)
            result = result.filter(movie => movie.genre.toLowerCase() === filter.genre.toLowerCase())
        }

        if (filter.year) {
            result = result.filter(movie => movie.year === filter.year);
        }

        return result;
    },
    create(movieData) {
        const movie = new Movie(movieData);

        // return createdMovie
        return movie.save();
    },
    getOne(movieId) {
        const movie = movies.find(movie => movie.id === movieId)

        return movie;
    },
}
