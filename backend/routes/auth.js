const express = require('express');
const router = express.Router();
const { fetchUser, loginUser, registerUser } = require('../controllers/userController')
const { body } = require('express-validator');
const jwt = require('jsonwebtoken')
const { getUserById } = require('../services/userServices')


router.post('/createUser', [
    body('name', "Enter a valid name!!").isLength({ min: 3 }),
    body('password', 'Password  must be atleast 8 character').isLength({ min: 3 }),
    body('email', "Enter a valid email!!").isEmail()],
    registerUser, (req, res) => {
        return res.status(200).send("User registered successfully");
    });

router.post('/login', [
    body('password', 'Password  must be atleast 8 character').isLength({ min: 3 }),
    body('email', "Enter a valid email!!").isEmail()],
    loginUser);



//login required 
router.post('/getUser', fetchUser, async (req, res) => {
    try {
        const userId = req.userId;
        const user = await getUserById(userId);
        if (user.length > 0)
            return res.send(user);
        return res.status(401).send("internal server error")


    } catch (error) {
        res.status(401).send("internal server error")
    }
})
module.exports = router;