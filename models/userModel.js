const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    continueRead: [
        {
            comicId: { type: ObjectId, ref: 'comics' },
            chapNumber: { type: Number },
        },
    ],
})

userSchema.statics.signup = async function (
    name,
    email,
    password,
    confirmPassword,
) {
    // Validate
    if (!name || !email || !password || !confirmPassword) {
        throw Error('Tất cả các trường phải đuược điền !!!')
    }
    if (!validator.isEmail(email)) {
        throw Error('Địa chỉ email không hợp lệ !!!')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Địa chỉ email đã được sử dụng !!!')
    }
    if (!validator.isStrongPassword(password, { minSymbols: 0 })) {
        throw Error(
            'Mật khẩu của bạn phải dài từ 8 kí tự trở lên, phải chứa ít nhất 1 kí tự viết hoa, 1 kí tự viết thường và 1 kí tự số !!!',
        )
    }
    if (confirmPassword !== password) {
        throw Error('Mật khẩu nhập lại không chính xác !!!')
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const user = await this.create({
        name,
        email,
        password: hashPassword,
        continueRead: [],
    })

    return user
}

userSchema.statics.login = async function (email, password) {
    // Validate
    if (!email || !password) {
        throw Error('Tất cả các trường phải đuược điền !!!')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Tài khoản không tồn tại !!!')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Mật khẩu không chính xác !!!')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)
