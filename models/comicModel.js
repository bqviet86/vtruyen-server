const mongoose = require('mongoose')

const Schema = mongoose.Schema

const comicSchema = new Schema({
    name: { type: String, required: true },
    updatedAt: { type: Date, required: true },
    otherName: String,
    author: { type: String, required: true },
    status: { type: String, required: true },
    genres: [
        {
            id: { type: String, required: true },
            value: { type: String, required: true },
            label: { type: String, required: true },
        },
    ],
    view: { type: Number, required: true },
    review: { type: String, required: true },
    newChapter: { type: String, required: true },
    oldChapter: { type: String, required: true },
    thumbnail: { type: String, required: true },
    slug: { type: String, required: true },
    rank: { type: Number, required: false },
    searchText: { type: String, required: true },
})

module.exports = mongoose.model('Comic', comicSchema)
