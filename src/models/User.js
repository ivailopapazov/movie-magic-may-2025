import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'User Email is required!'],
        unique: true, // Not a validator but db index // DB Validation not a model validation
        minLength: [10, 'Email should be at least 10 characters long!'],
        validate: [/@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/, 'Invalid Email Format!']
        // Cusrtom schema validator
        // validate: {
        //     validator: async function (value) {
        //         const existingUser = await User.findOne({ email: value })

        //         return !existingUser;
        //     },
        //     message: 'User already exists!',
        // }
    },
    password: {
        type: String,
        required: [true, 'Please provide password!'],
        validate: [/^[a-zA-Z0-9]+$/, 'Password should be alphanumeric'],
        minLength: [6, 'Password should be at least 6 characters long!'],
    },
});

// Validate if user email is unique with custom validator
// userSchema.path('email').validate(async function (value) {
//     const existingUser = await User.findOne({ email: value })

//     if (existingUser) {
//         throw new Error('User already exists!');
//     }
// });

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10);
});

// Validate rePassword using virtual setter
userSchema.virtual('rePassword')
    .set(function(value) {
        if (this.password !== value) {
            throw new Error('Password Missmatch!');
        }
    });

const User = model('User', userSchema);

export default User;
