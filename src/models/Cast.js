import { Schema, model } from 'mongoose'

const castSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        min: 12,
        max: 120,
    },
    born: { 
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        validate: [/^https?:\/\//, 'Invalid Image URL!'],
        required: true,
    }
});

const Cast = model('Cast', castSchema);

export default Cast;
