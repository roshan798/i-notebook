const db = require('../configs/db')
const registerUser = async (data) => {
    const user = {
        username: data.name,
        email: data.email,
        password: data.password,
    }
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO Users SET ?', user, (error, result) => {
            if (error) {
                reject({ Response: false, message: error })
            }
            // console.log("inside",result);
            resolve('User registered successfully')
        })
    })
}
const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        try {
            db.query(
                'SELECT * FROM Users where email = ?',
                email,
                (error, result) => {
                    if (error) {
                        reject(new Error(`ERROR: ${error}`))
                    }
                    resolve(result)
                }
            )
        } catch (error) {
            reject({ Response: false, message: error })
        }
    })
}

const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            db.query(
                'SELECT id,email,username,created_at,updated_at FROM Users where id = ?',
                id,
                (error, result) => {
                    if (error) {
                        reject(new Error(`ERROR: ${error}`))
                    }
                    resolve(result)
                }
            )
        } catch (error) {
            reject({ Response: false, message: error })
        }
    })
}

const setForgotPasswordToken = (user_id, token) => {
    return new Promise((resolve, reject) => {
        try {
            db.query(
                `UPDATE Users
                SET otp = ?, otp_expiry = TIMESTAMPADD(MINUTE, 10, NOW())
                WHERE id = ?`,
                [otp, user_id],
                (result, error) => {
                    if (error) {
                        reject(new Error(`ERROR: ${error}`))
                    }
                    resolve({
                        response: true,
                    })
                }
            )
        } catch (error) {
            reject(new Error(`ERROR: ${error}`))
        }
    })
}

//TODO implement ValidateOTP funcction
const ValidateOTP = (user_id, otp) => {}
module.exports = {
    registerUser,
    getUserByEmail,
    getUserById,
    setForgotPasswordToken,
}
