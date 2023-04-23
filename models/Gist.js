const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    desc: {
        type: String,
    },
    lang: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.models.Gist || mongoose.model('Gist', schema)