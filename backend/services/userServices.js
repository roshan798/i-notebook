const db = require('../configs/db');
const registerUser = async (data) => {
    const user = {
        username: data.name,
        email: data.email,
        password: data.password
    }
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO users SET ?', user,
            (error, result) => {
                if (error) {
                    reject({Response:false,message:error});
                }
                resolve('User registered successfully')
            });

    })
}
const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        try {
            db.query('SELECT * FROM users where email = ?', email,
                (error, result) => {
                    if (error) {
                        reject(new Error(`ERROR: ${error}`));
                    }
                    resolve(result)
                })
        } catch (error) {
            reject({Response:false,message:error});
        }
    })
}

const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            db.query('SELECT id,email,username,created_at,updated_at FROM users where id = ?', id,
                (error, result) => {
                    if (error) {
                        reject(new Error(`ERROR: ${error}`));
                    }
                    resolve(result)
                })
        } catch (error) {
            reject({Response:false,message:error});
        }
    })
}
module.exports = { registerUser,getUserByEmail,getUserById};