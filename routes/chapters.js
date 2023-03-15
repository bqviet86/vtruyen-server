const express = require('express')

const chapterController = require('../controllers/chapterController')

const router = express.Router()

router.get('/:comicId', chapterController.getChapters)
router.get('/:comicId/:number', chapterController.getSiblingChapter)

module.exports = router
