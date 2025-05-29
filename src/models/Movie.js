import { Schema, model, Types } from 'mongoose';

const maxYearAllowed = new Date().getFullYear() + 5;
const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required!'],
    },
    category: {
        type: String,
        required: [true, 'category is required!'],
    },
    genre: {
        type: String,
        required: [true, 'genre is required!'],
        lowercase: true, // not a validator, but sanitizer
    },
    director: {
        type: String,
        required: [true, 'director is required!'],
    },
    year: {
        type: Number,
        required: [true, 'year is required!'],
        min: 1970,
        max: [maxYearAllowed, `Year cannot be larger than ${maxYearAllowed}`],
    },
    imageUrl: {
        type: String,
        required: [true, 'imageUrl is required!'],
        validate: [/^https?:\/\//, 'Invalid Image URL!'],
    },
    rating: {
        type: Number,
        required: [true, 'rating is required!'],
        min: [1, 'Rating should be equal or more than 1'],
        max: [10, 'Rating should be equal or less than 10'],
    },
    description: {
        type: String,
        required: [true, 'description is required!'],
        maxLength: [1000, 'Description is too long!'],
    },
    casts: [{
        type: Types.ObjectId,
        ref: 'Cast',
    }]
});

const Movie = model('Movie', movieSchema);

export default Movie;


