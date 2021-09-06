import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Country = new Schema({
    name: {
        type: String
    }
})

export default mongoose.model('Country', Country, 'countries');