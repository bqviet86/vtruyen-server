const Page = require('../models/pageModel')

const pageController = {
    getPages: async (req, res) => {
        const { comicId, number } = req.query

        try {
            const page = await Page.findOne({ comicId, chapterNumber: number })

            res.status(200).json(page)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },
}

module.exports = pageController
