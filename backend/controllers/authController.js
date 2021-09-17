const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const user = require('../models/user')

exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'people/boy-snow-hoodie',
            url: 'https://res.cloudinary.com/variety-stationers-and-sports/image/upload/v1622395643/samples/people/boy-snow-hoodie.jpg'
        }
    })

    sendToken(user, 200, res)
})

exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return next(new ErrorHandler('Please enter an Email & Password', 404))
    }

    const user = await User.findOne({ email }).select('+password')
    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }

    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }

    sendToken(user, 200, res)
})

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404))
    }

    const resetToken = user.getResetPasswordToken()
    await user.save({ validateBeforeSave: false })

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`
    const message = `Your password reset token is as follows:\n\n${resetUrl}\n\n If you have not requested this email, Just ignore it.`

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password Recovery Request',
            message
        })

        res.status(200).json({
            success: true,
            message: `An email has been sent to ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({ validateBeforeSave: false })
        return next(new ErrorHandler('Internal Server Error', 500))
    }
})


exports.resetPassword = catchAsyncError(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    if (!user) {
        return next(new ErrorHandler('Password Reset token is invalid / Expired', 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 401))
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    sendToken(user, 200, res)
})

exports.getUserProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success: true,
        user
    })
})


exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')
    const isMatched = await user.comparePassword(req.body.oldPassword)

    if (!isMatched) {
        return next(new ErrorHandler('Old Password is incorrect'))
    }
    user.password = req.body.password
    await user.save()

    sendToken(user, 200, res)
})

exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})



exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})

//Admin Routes

exports.allUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find()

    res.status(200).json({
        success: true,
        users
    })
})

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler(`user does not found with id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
})


exports.updateUser = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler(`user does not found with id: ${req.params.id}`))
    }
    await user.remove()

    res.status(200).json({
        success: true
    })
})