const express = require('express')

const comicController = require('../controllers/comicController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.get('/slider', comicController.getSliderComic)
router.get('/trending', comicController.getTrendingComic)
router.get('/recommended', comicController.getRecommendedComic)
router.get('/completed', comicController.getCompletedComic)
router.get('/latest-update', comicController.getLatestUpdateComic)
router.get('/most-view', comicController.getMostViewComic)
router.get(
    '/continue-reading',
    requireAuth,
    comicController.getContinueReadingComic,
)
router.get('/search', comicController.getSearchComic)
router.get('/details/:slug', comicController.getDetailsComic)
router.post('/random', comicController.getRandomComic)
router.patch('/updateReading/:userEmail', comicController.updateContinueReading)
router.delete(
    '/removeReading/:userEmail/:comicId',
    comicController.removeContinueReading,
)
// router.get('/test', comicController.test)

module.exports = router
