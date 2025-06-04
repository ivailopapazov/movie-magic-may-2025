import Movie from '../models/Movie.js';
// import Cast from '../models/Cast.js';

export default {
    getAll(filter = {}) {
        let query = Movie.find();

        if (filter.search) {
            query = query.find({ title: { $regex: new RegExp(filter.search, 'i') } })
        }

        if (filter.genre) {
            query = query.find({ genre: filter.genre.toLowerCase() })
        }

        if (filter.year) {
            // query = query.find({ year: filter.year });
            query = query.where('year').equals(filter.year);
        }

        return query;
    },
    create(movieData, userId) {
        const movie = new Movie(movieData);

        movie.owner = userId;

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
