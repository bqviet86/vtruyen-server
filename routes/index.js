const userRoutes = require('./users')
const comicRoutes = require('./comics')
const chapterRoutes = require('./chapters')
const pageRoutes = require('./pages')

const routes = (app) => {
    app.use('/api/user', userRoutes)
    app.use('/api/comics', comicRoutes)
    app.use('/api/chapters', chapterRoutes)
    app.use('/api/pages', pageRoutes)
}

module.exports = routes
