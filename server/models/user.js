import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String, 
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String, 
        required: true,
        min: 6,
        max: 20
    },
    picture: {
        type: String,
        default: '/avatar.png'
    },
    role: {
        type: [String],
        default: ['Subscriber'],
        enum: ['Subscriber', 'Instructor', 'Admin']
    },
    stripe_account_id: '',
    stripe_seller: {},
    stripeSession: {}
}, {
    timestamps: true
})


module.exports = mongoose.model('users', userSchema);
