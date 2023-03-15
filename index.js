const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const routes = require('./routes')

const app = express()

dotenv.config()
mongoose.set('strictQuery', false)

// Middleware
app.use(express.json())
app.use(cors())

// Routes
routes(app)

// Connect to DB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () =>
            console.log(
                `Connect to DB & listen on http://localhost:${process.env.PORT}`,
            ),
        )
    })
    .catch((error) => console.log(error))
