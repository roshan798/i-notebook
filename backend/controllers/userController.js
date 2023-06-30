const { JsonWebTokenError } = require('jsonwebtoken');
const userSevices = require('../services/userServices');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const JWT_TOKEN = process.env.JWT_SECRET;

const registerUser = async (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //checking whether a user exist with input email or not
        let data = await userSevices.getUserByEmail(req.body.email);
        if (data.length > 0) {
            return res.status(200).send({ message: `${req.body.email} already exists!` });
        }
        req.body.password = await bcrypt.hash(req.body.password, 10);
        let result = await userSevices.registerUser(req.body);
        next();
    } catch (error) {
        res.status(400).send(`ERROR: ${error}`);
    }
}

// login route 
const loginUser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await userSevices.getUserByEmail(req.body.email);

        if (user.length > 0 && await bcrypt.compare(req.body.password, user[0].password) === true) {
            let data = {
                userId: user[0].id
            }
            let token = jwt.sign(data, JWT_TOKEN);
            res.status(200).json({ authToken: token });
        }
        else {
            res.status(200).json({ message: "Invalid email or password. Please login with correct credentials" });
        }
    }
    catch (error) {
        res.status(500).send('Internal server error!!');
    }

}

const fetchUser = async (req,res,next)=>{
    //get user from jwt token
    const token = req.header('auth-token');
    if(!token) {
        res.status(401).send('Please authenticate using  valid token')
    }
    try {
        const data = jwt.verify(token,JWT_TOKEN);
        req.userId = data.userId;
        next();
    } 
    catch (error) {
        res.status(401).send('Please authenticate using  valid token')
        
    }
}

module.exports = { registerUser, loginUser,fetchUser }