const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const chapterSchema = new Schema({
    comicId: { type: ObjectId, ref: 'comics', required: true },
    chapters: [
        {
            title: { type: String },
            number: { type: Number },
            createAt: { type: Date, default: Date.now },
            slug: { type: String, required: true },
        },
    ],
})

module.exports = mongoose.model('Chapter', chapterSchema)
