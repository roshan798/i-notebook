const express = require('express')
const router = express.Router()
const {
    fetchUser,
    loginUser,
    registerUser,
} = require('../controllers/userController')
const { body } = require('express-validator')
const jwt = require('jsonwebtoken')
const { getUserById } = require('../services/userServices')

router.post(
    '/createUser',
    [
        body('name', 'Enter a valid name!!').isLength({ min: 3 }),
        body('password', 'Password  must be atleast 8 character').isLength({
            min: 3,
        }),
        body('email', 'Enter a valid email!!').isEmail(),
    ],
    registerUser,
    (req, res) => {
        return res.status(200).send({
            success: true,
            message: 'User registered successfully',
        })
    }
)

router.post(
    '/login',
    [
        body('password', 'Password  must be atleast 8 character').isLength({
            min: 3,
        }),
        body('email', 'Enter a valid email!!').isEmail(),
    ],
    loginUser
)

//login required
router.get('/getUser', fetchUser, async (req, res) => {
    try {
        const user = {
            name: req.user.name,
            email: req.user.email,
        }
        return res.send({
            success: true,
            user: user,
        })
    } catch (error) {
        res.status(401).json({
            success: false,
            error: 'internal server error \n ERROR: ' + error.message,
        })
    }
})
router.post('forgot-password', (req, res) => {})

module.exports = router
