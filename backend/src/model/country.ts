import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Country = new Schema({
    name: {
        type: String
    },
    flagImgSrc: {
        type: String
    },
    numberOfAthletes: {
        type: Number
    },
    goldMedals: {
        type: Number
    },
    silverMedals: {
        type: Number
    },
    bronzeMedals: {
        type: Number
    }
})

export default mongoose.model('Country', Country, 'countries');