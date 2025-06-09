import { Schema, model, Types } from 'mongoose';

const maxYearAllowed = new Date().getFullYear() + 5;
const validCharactersPattern = /^[a-zA-Z0-9 ]+$/;

const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required!'],
        validate: [validCharactersPattern, 'Only engilsh letters, digits and whitespace are allowed!'],
        minLengh: [5, 'Title should be at least 5 characters long'],
    },
    category: {
        type: String,
        required: [true, 'category is required!'],
        enum: {
            values: ['tv-show', 'animation', 'movie', 'dcumentary', 'short-film'],
            message: (props) => `${props.value} is not a valid category!`
        }
    },
    genre: {
        type: String,
        required: [true, 'genre is required!'],
        lowercase: true, // not a validator, but sanitizer
        validate: [validCharactersPattern, 'Only engilsh letters, digits and whitespace are allowed!'],
        minLengh: [5, 'Genre should be at least 5 characters long'],
    },
    director: {
        type: String,
        required: [true, 'director is required!'],
        validate: [validCharactersPattern, 'Only engilsh letters, digits and whitespace are allowed!'],
        minLengh: [5, 'Director should be at least 5 characters long'],
    },
    year: {
        type: Number,
        required: [true, 'year is required!'],
        min: [1900, 'Movie year cannot be less than 1900 year'],
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
        minLengh: [20, 'Description is too short!'],
        validate: [validCharactersPattern, 'Only engilsh letters, digits and whitespace are allowed!'],
    },
    casts: [{
        type: Types.ObjectId,
        ref: 'Cast',
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User',
    }
});

const Movie = model('Movie', movieSchema);

export default Movie;


