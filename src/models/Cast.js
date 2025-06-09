import { Schema, model } from 'mongoose'

const validCharactersPattern = /^[a-zA-Z0-9 ]+$/;

const castSchema = new Schema({
    name: {
        type: String,
        required: true,
        validate: [validCharactersPattern, 'Only engilsh letters, digits and whitespace are allowed!'],
        minLengh: [5, 'Name should be at least 5 characters long'],
    },
    age: {
        type: Number,
        required: true,
        min: [1, 'Age should be at least 1 years old'],
        max: [120, 'Age should be less than 120 years old'],
    },
    born: { 
        type: String,
        required: true,
        validate: [validCharactersPattern, 'Only engilsh letters, digits and whitespace are allowed!'],
        minLengh: [10, 'Born should be at least 5 characters long'],
    },
    imageUrl: {
        type: String,
        validate: [/^https?:\/\//, 'Invalid Image URL!'],
        required: true,
    }
});

const Cast = model('Cast', castSchema);

export default Cast;
