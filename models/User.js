import mongoose from 'mongoose'


const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gists: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Gist'
        }
    ]
})

export default mongoose.models.User || mongoose.model('User', schema)