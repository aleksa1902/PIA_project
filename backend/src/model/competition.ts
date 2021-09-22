import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Competition = new Schema({
    competition: {
        type: String
    },
    sport: {
        type: String
    },
    discipline: {
        type: String
    },
    format: {
        type: String
    },
    gender: {
        type: String
    },
    location: {
        type: String
    },
    date: {
        type: Date
    },
    delegate:{
        type: String
    },
    finished:{
        type: Boolean
    },
    athletes: [{
        type: String
    }]
})

export default mongoose.model('Competition', Competition, 'competitions');