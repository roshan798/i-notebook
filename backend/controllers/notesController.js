const db = require('../configs/db');
const { param } = require('../routes/auth');

const getAllNotes = (userId) =>{
    return new Promise((resolve,reject)=>{
        try {
            db.query('SELECT * FROM notes WHERE user_id = ? ORDER BY created_at DESC',userId,
            (error,result)=>{
                if(error) 
                    reject(`ERROR : ${error.message}`);
                resolve(result);
            });
        } catch (error) {
            reject(`ERROR : ${error.message}`);
        }
    })
}

function addNotes(data) {
    return new Promise((resolve, reject) => {
        try {
            db.query('INSERT INTO Notes SET ?', data,
                (error, result) => {
                    if (error) {
                        reject(`ERROR : ${error.message}`);
                    }
                    const notesId = result.insertId;
                    resolve({ "notesId": notesId });
                });
        } catch (error) {
            reject(`ERROR : ${error.message}`);
        }
    });
}

const deleteNotes = (noteId)=>{
    return new Promise((resolve,reject)=>{
        try {
            db.query('DELETE FROM Notes WHERE id = ?',noteId,
            (error,result)=>{
                if(error){
                    reject(`ERROR : ${error.message}`);
                }
                resolve({message:"Deleted Successfull"});
            })
        } catch (error) {
            reject(`ERROR : ${error.message}`);
        }
    })
}

const updateNotes = (notesId, notes) => {
    return new Promise((resolve, reject) => {
      console.log(notesId, notes);
      try {
        db.query(
          `UPDATE Notes
          SET title = ?, content = ?
          WHERE id = ?`,
          [notes.title, notes.content, notesId],
          (error, result) => {
            if (error) {
              console.log(error);
              reject(`ERROR: ${error.message}`);
            } else {
              console.log(result);
              resolve({ message: "Notes updated successfully" });
            }
          }
        );
      } catch (error) {
        reject(`ERROR: ${error.message}`);
      }
    });
  };
  

const getNotesById = (notesId)=>{
    console.log('getNotes inside');
    return new Promise((resolve,reject)=>{
        try {
            db.query(`SELECT * from Notes WHERE id = ?`,notesId,
            (error,result)=>{
                if(error){
                    reject(`ERROR : ${error.message}`);
                }
                resolve(result);
            });
        } catch (error) {
            reject(`ERROR : ${error.message}`);
        }
    })
}
module.exports = {getAllNotes,addNotes,deleteNotes,updateNotes,getNotesById}

