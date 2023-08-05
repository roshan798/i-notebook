const { JsonWebTokenError } = require('jsonwebtoken');
const userSevices = require('../services/userServices');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { route } = require('../routes/auth');
const JWT_TOKEN = process.env.JWT_SECRET;

const registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
    try {
        //checking whether a user exist with input email or not
        let data = await userSevices.getUserByEmail(req.body.email);
        if (data.length > 0) {
            return res.status(200).send(
                {
                    success: false,
                    error: `${req.body.email} already exists!`
                }
            );
        }
        req.body.password = await bcrypt.hash(req.body.password, 10);
        let result = await userSevices.registerUser(req.body);
        next();
    } catch (error) {
        res.status(400).send({
            success: false,
            error: `ERROR: ${error.message}`
        });
    }
}

// login route 
const loginUser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(
            {
                success: false,
                errors: errors.array()
            }
        );
    }

    try {
        let user = await userSevices.getUserByEmail(req.body.email);

        if (user.length > 0 && await bcrypt.compare(req.body.password, user[0].password) === true) {
            let data = {
                userId: user[0].id,
                name: user[0].username,
                email: user[0].email
            }
            const User = {
                name: user[0].username,
                email: user[0].email
            }
            let token = jwt.sign(data, JWT_TOKEN);
            res.status(200).json({
                success: true,
                authToken: token,
            });
        }
        else {
            res.status(200).json({
                success: false,
                message: "Invalid email or password. Please login with correct credentials"
            });
        }
    }
    catch (error) {
        console.log("ERROR",error);
        res.status(500).send({
            success: false,
            error: 'Internal server error!!'
        });
    }
}

const fetchUser = async (req, res, next) => {
    //get user from jwt token
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({
            success: false,
            error: 'Please authenticate using  valid token'
        })
    }
    try {
        const data = jwt.verify(token, JWT_TOKEN);
        req.user = data;
        next();
    }
    catch (error) {
        res.status(401).send({
            success: false,
            error: 'Please authenticate using  valid token'
        })

    }
}

module.exports = { registerUser, loginUser, fetchUser }