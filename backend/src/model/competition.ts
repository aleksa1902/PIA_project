import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Competition = new Schema({
    competition: {
        type: String
    },
    sport: {
        type: String
    },
    format: {
        type: String
    },
    date: {
        type: Date
    },
    time: {
        type: String
    },
    athlets: {
        type: Array<String>()
    }
})

export default mongoose.model('Competition', Competition, 'competitions');