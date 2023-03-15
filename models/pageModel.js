const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const pageSchema = new Schema({
    comicId: { type: ObjectId, ref: 'comics', required: true },
    chapterNumber: { type: Number, required: true },
    pages: [
        {
            src: { type: String },
            fallbackSrc: { type: String },
        },
    ],
})

module.exports = mongoose.model('Page', pageSchema)
