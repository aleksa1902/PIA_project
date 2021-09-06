import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let User = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    surname: {
        type: String
    },
    country: {
        type: String
    },
    email: {
        type: String
    },
    userType: {
        type: String
    }
})

export default mongoose.model('User', User, 'users');