import Movie from '../models/Movie.js';
import Cast from '../models/Cast.js';

export default {
    async getAll(filter = {}) {
        let result = await Movie.find({}).lean();

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

        return movie.save();
    },
    async getOne(movieId) {
        const movie = await Movie.findById(movieId).populate('casts');

        return movie;
    },
    async attach(movieId, castId) {
        // Variant #1 (get movie, update movie, save movie)
        const movie = await this.getOne(movieId);

        movie.casts.push(castId);

        return movie.save();
    },
    // async getCasts(movieId) {
    //     const movie = await this.getOne(movieId);

    //     const casts = await Cast.find({ _id: { $in: movie.casts } }); // MongoDb style
    //     // const casts = await Cast.find().in('_id', movie.casts); // Mongose query

    //     return casts;
    // }
}
