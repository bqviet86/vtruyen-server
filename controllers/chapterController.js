const Chapter = require('../models/chapterModel')

const chapterController = {
    getChapters: async (req, res) => {
        const comicId = req.params.comicId

        try {
            const chapter = await Chapter.findOne({ comicId })

            res.status(200).json(chapter)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },

    getSiblingChapter: async (req, res) => {
        const { comicId, number } = req.params

        try {
            const chapter = await Chapter.findOne({ comicId })

            const chapterIndex = chapter.chapters.findIndex(
                (chap) => `${chap.number}` === number,
            )

            res.status(200).json({
                prevChapter: chapter.chapters[chapterIndex + 1] || null,
                nextChapter: chapter.chapters[chapterIndex - 1] || null,
            })
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },
}

module.exports = chapterController
