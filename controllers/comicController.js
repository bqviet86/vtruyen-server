const mongoose = require('mongoose')

const Comic = require('../models/comicModel')
const User = require('../models/userModel')
const Chapter = require('../models/chapterModel')
const Pages = require('../models/pageModel')
const removeAccents = require('../utils/removeAccents')

const comicController = {
    // test: async (req, res) => {
    //     const chapters = await Chapter.find({})

    //     try {
    //         for (let i = 0; i < chapters.length; i++) {
    //             const comicId = chapters[i].comicId
    //             const chapter = chapters[i]

    //             for (let j = 0; j < chapter.chapters.length; j++) {
    //                 const number = Number(
    //                     chapter.chapters[j].title.slice(
    //                         chapter.chapters[j].title.indexOf(' ') + 1,
    //                         chapter.chapters[j].title.indexOf(':') === -1
    //                             ? undefined
    //                             : chapter.chapters[j].title.indexOf(':'),
    //                     ),
    //                 )

    //                 chapter.chapters[j].number = number
    //             }

    //             await Chapter.findByIdAndUpdate(chapter._id, {
    //                 chapters: chapter.chapters,
    //             })

    //             console.log(`Chapter ${i + 1}`)
    //         }

    //         res.status(200).json({})
    //     } catch (err) {
    //         res.status(400).json({ message: err.message })
    //     }
    // },

    // test: async (req, res) => {
    //     const chapters = await Chapter.find({})

    //     try {
    //         for (let i = 0; i < chapters.length; i++) {
    //             const chapter = chapters[i]
    //             const chapterId = chapter._id
    //             const chapterNumber = chapter.chapters[0].number

    //             await Pages.updateOne({ chapterId }, { chapterNumber })

    //             console.log(`Pages ${i + 1}`)
    //         }

    //         res.status(200).json({})
    //     } catch (err) {
    //         res.status(400).json({ message: err.message })
    //     }
    // },

    // test: async (req, res) => {
    //     const comics = await Comic.find({})

    //     try {
    //         for (let i = 3; i < comics.length; i++) {
    //             const comicId = comics[i]._id
    //             const { _id: chapterId } = await Chapter.findOne(
    //                 { comicId },
    //                 '_id',
    //             )

    //             await Pages.updateOne({ comicId: chapterId }, { comicId })

    //             console.log(`Pages ${i + 1}`)
    //         }

    //         res.status(200).json({})
    //     } catch (err) {
    //         res.status(400).json({ message: err.message })
    //     }
    // },

    getDetailsComic: async (req, res) => {
        let comic = {}
        const { slug } = req.params
        const { type } = req.query

        try {
            if (type === 'full') {
                comic = await Comic.findOne({ slug })
            }

            if (type === 'lack') {
                comic = await Comic.findOne({ slug: new RegExp(slug, 'i') })
            }

            res.status(200).json(comic)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },

    getSliderComic: async (req, res) => {
        const comics = []
        const sliderComic = [
            'Diệt Quỷ Nhẫn Giả',
            'Trường Học Siêu Anh Hùng',
            'Chào mừng đến với lớp học Thượng đẳng',
            'Thanh Gươm Diệt Quỷ',
            'Chainsaw man - Thợ Săn Quỷ',
            'Đảo Hải Tặc',
            'Chúa tể học đường',
            'Sự Trỗi Dậy Của Anh Hùng Khiên',
            'Shuumatsu no Valkyrie',
            'Anh Hùng OnePunch',
        ]

        try {
            for (let i = 0; i < sliderComic.length; i++) {
                const comic = await Comic.findOne({ name: sliderComic[i] })

                comics.push(comic)
            }

            res.status(200).json(comics)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },

    getTrendingComic: async (req, res) => {
        const comics = []
        const trendingComic = [
            'Tiền đạo số 1',
            'Chainsaw man - Thợ Săn Quỷ',
            'Đảo Hải Tặc',
            'Thần Chết Ichigo',
            'Berserk',
            'Komi không thể giao tiếp',
            'Thế Giới Thợ Săn',
            '100 Điều Muốn Làm Trước Khi Chết',
            'Kingdom - Vương Giả Thiên Hạ',
            'Trường Học Siêu Anh Hùng',
        ]

        try {
            for (let i = 0; i < trendingComic.length; i++) {
                const comic = await Comic.findOne({ name: trendingComic[i] })

                comics.push(comic)
            }
            res.status(200).json(comics)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },

    getRecommendedComic: async (req, res) => {
        const comics = []
        const recommendedComic = [
            'Thế Giới Thợ Săn',
            'The Beginning After The End',
            'Sasuke Truyền Kì',
            'Bị bắt trở thành vô địch Thánh Nữ',
            'Chú Thuật Hồi Chiến',
            'Naruto - Cửu Vĩ Hồ Ly',
            'Gia Đình Điệp Viên',
            'Wakamono no Kuro Mahou Hanare ga Shinkoku desu ga, Shuushoku shite Mitara Taiguu Iishi',
            'Gửi em, người bất tử',
            'Anh Hùng OnePunch',
            'Quái Vật #8',
            'Thần Chết Ichigo',
            'Mob Psycho 100',
            'Hội Pháp Sư nhiệm vụ trăm năm',
            'Onna No Sono No Hoshi',
            'Uzaki-chan muốn đi chơi!',
            'Uzumaki Boruto',
            'Chainsaw man - Thợ Săn Quỷ',
            'Fuufu Ijou, Koibito Miman.',
            'Thế Quái Nào Cô Giáo Lại Ở Đây!?',
            'Tiền đạo số 1',
            'Mairimashita! Iruma-kun',
            'Thám Tử Conan',
            'Tôi Đã Chuyển Sinh Thành Slime',
        ]

        try {
            for (let i = 0; i < recommendedComic.length; i++) {
                const comic = await Comic.findOne({ name: recommendedComic[i] })

                comics.push(comic)
            }
            res.status(200).json(comics)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },

    getCompletedComic: async (req, res) => {
        let comics = []
        const { type } = req.query
        const regex = new RegExp('Hoàn thành', 'i')

        try {
            if (type === 'less') {
                comics = await Comic.find({ status: regex })
                    .sort({ updatedAt: -1 })
                    .limit(24)
            }

            if (type === 'more') {
                comics = await Comic.find({ status: regex }).sort({ view: -1 })
            }

            res.status(200).json(comics)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },

    getRandomComic: async (req, res) => {
        const comics = []
        const randoms = []
        const { randomComics } = req.body
        const count = await Comic.countDocuments()

        try {
            for (let i = 0; i < 12; i++) {
                let random

                do {
                    random = Math.floor(Math.random() * count)
                } while (
                    randoms.includes(random) ||
                    randomComics.includes(random)
                )

                randoms.push(random)
                randomComics.push(random)

                const comic = await Comic.findOne().skip(random)

                comics.push(comic)
            }

            res.status(200).json({ comics, randomComics })
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },

    getLatestUpdateComic: async (req, res) => {
        let comics = []
        const { type } = req.query

        try {
            if (type === 'less') {
                comics = await Comic.find({}).sort({ updatedAt: -1 }).limit(10)
            }

            if (type === 'more') {
                comics = await Comic.find({}).sort({ updatedAt: -1 })
            }

            res.status(200).json(comics)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },

    getMostViewComic: async (req, res) => {
        try {
            const comics = await Comic.find({}).sort({ view: -1 }).limit(10)

            res.status(200).json(comics)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },

    getContinueReadingComic: async (req, res) => {
        const comics = []
        const _id = req.user._id

        try {
            const user = await User.findOne({ _id })

            for (let i = 0; i < user.continueRead.length; i++) {
                const comic = await Comic.findById({
                    _id: user.continueRead[i].comicId,
                })

                comics.push({
                    ...comic._doc,
                    currentChapNumber: user.continueRead[i].chapNumber,
                })
            }

            res.status(200).json(comics)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },

    updateContinueReading: async (req, res) => {
        const newComic = req.body
        const email = req.params.userEmail

        try {
            const user = await User.findOne({ email })

            await User.updateOne(
                { email },
                {
                    continueRead: [
                        newComic,
                        ...user.continueRead.filter(
                            (comic) => !comic.comicId.equals(newComic.comicId),
                        ),
                    ],
                },
            )

            res.status(200).json({ status: 'success' })
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },

    removeContinueReading: async (req, res) => {
        const { userEmail: email, comicId } = req.params

        try {
            const user = await User.findOne({ email })

            await User.updateOne(
                { email },
                {
                    continueRead: user.continueRead.filter(
                        (comic) => !comic.comicId.equals(comicId),
                    ),
                },
            )

            res.status(200).json({ status: 'success' })
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },

    getSearchComic: async (req, res) => {
        let comics = []
        const { q, type } = req.query
        const regex = new RegExp(q, 'i')

        try {
            if (type === 'less') {
                comics = await Comic.find({
                    $or: [
                        { name: regex },
                        { otherName: regex },
                        { review: regex },
                        { searchText: regex },
                    ],
                }).limit(5)
            }

            if (type === 'more') {
                comics = await Comic.find({
                    $or: [
                        { name: regex },
                        { otherName: regex },
                        { review: regex },
                        { searchText: regex },
                    ],
                })
            }

            res.status(200).json(comics)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },
}

module.exports = comicController
