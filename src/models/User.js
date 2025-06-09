import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'User Email is required!'],
        unique: true, // Not a validator but db index // DB Validation not a model validation
        // Cusrtom schema validator
        // validate: {
        //     validator: async function (value) {
        //         const existingUser = await User.findOne({ email: value })

        //         if (existingUser) {
        //             throw new Error('User already exists!');
        //         }
        //     }
        // }
    },
    password: {
        type: String,
        required: [true, 'Please provide password!'],
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

const User = model('User', userSchema);

export default User;
