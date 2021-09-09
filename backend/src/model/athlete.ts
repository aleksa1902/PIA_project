import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Athlete = new Schema({
    name: {
        type: String
    },
    surname: {
        type: String
    },
    country: {
        type: String
    },
    gender: {
        type: String
    },
    disciplines: [{
        type: String
    }]
})

export default mongoose.model('Athlete', Athlete, 'athletes');