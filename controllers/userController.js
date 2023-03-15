const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

const userController = {
    signupUser: async (req, res) => {
        const { name, email, password, confirmPassword } = req.body

        try {
            const user = await User.signup(
                name,
                email,
                password,
                confirmPassword,
            )
            const token = createToken(user._id)

            res.status(200).json({ email, token })
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },

    loginUser: async (req, res) => {
        const { email, password } = req.body

        try {
            const user = await User.login(email, password)
            const token = createToken(user._id)

            res.status(200).json({ email, token })
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },

    refreshToken: async (req, res) => {
        const { userEmail: email } = req.params

        try {
            const user = await User.findOne({ email })
            const token = createToken(user._id)

            res.status(200).json({ email, token })
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },
}

module.exports = userController
