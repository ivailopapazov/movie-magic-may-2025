import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'User Email is required!'],
        unique: true, // Not a validator but db index // DB Validation not a model validation
    },
    password: {
        type: String,
        required: [true, 'Please provide password!'],
    },
});

userSchema.pre('save', async function () {
    // const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, 10);
});

const User = model('User', userSchema);

export default User;
