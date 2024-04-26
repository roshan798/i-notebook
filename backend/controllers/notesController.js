const db = require('../configs/db')

const getAllNotes = (userId) => {
    return new Promise((resolve, reject) => {
        try {
            db.query(
                'SELECT * FROM Notes WHERE user_id = ? ORDER BY id DESC',
                userId,
                (error, result) => {
                    if (error)
                        reject({
                            error: error.message,
                            success: false,
                        })
                    resolve(result)
                }
            )
        } catch (error) {
            reject({
                error: error.message,
                success: false,
            })
        }
    })
}

function addNotes(data) {
    return new Promise((resolve, reject) => {
        try {
            db.query('INSERT INTO Notes SET ?', data, (error, result) => {
                if (error) {
                    reject({
                        error: error.message,
                        success: false,
                    })
                }
                const NotesId = result.insertId
                resolve({
                    NotesId,
                    success: true,
                })
            })
        } catch (error) {
            reject({
                error: error.message,
                success: false,
            })
        }
    })
}

const deleteNotes = (noteId) => {
    return new Promise((resolve, reject) => {
        try {
            db.query(
                'DELETE FROM Notes WHERE id = ?',
                noteId,
                (error, result) => {
                    if (error) {
                        reject({
                            error: error.message,
                            success: false,
                        })
                    }
                    resolve({ message: 'Deleted Successfull' })
                }
            )
        } catch (error) {
            reject({
                error: error.message,
                success: false,
            })
        }
    })
}

const updateNotes = (NotesId, Notes) => {
    return new Promise((resolve, reject) => {
        try {
            db.query(
                `UPDATE Notes
                SET title = ?, content = ?
                WHERE id = ?`,
                [Notes.title, Notes.content, NotesId],
                (error, result) => {
                    if (error) {
                        reject({
                            error,
                            success: false,
                        })
                    } else {
                        resolve({ message: 'Notes updated successfully' })
                    }
                }
            )
        } catch (error) {
            reject({
                error: error.message,
                success: false,
            })
        }
    })
}

const getNotesById = (NotesId) => {
    return new Promise((resolve, reject) => {
        try {
            db.query(
                `SELECT * from Notes WHERE id = ?`,
                NotesId,
                (error, result) => {
                    if (error) {
                        reject({
                            error: error.message,
                            success: false,
                        })
                    }
                    resolve(result)
                }
            )
        } catch (error) {
            reject({
                error: error.message,
                success: false,
            })
        }
    })
}
module.exports = {
    getAllNotes,
    addNotes,
    deleteNotes,
    updateNotes,
    getNotesById,
}
