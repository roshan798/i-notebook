const express = require('express')
const router = express.Router()
const {
    getAllNotes,
    addNotes,
    updateNotes,
    deleteNotes,
    getNotesById,
} = require('../controllers/notesController')
const { fetchUser } = require('../controllers/userController')
const { body, validationResult } = require('express-validator')

//first create the post route to add nodes and before doing that first of all create the notes table in the db
router.get('/fetchAll', fetchUser, async (req, res) => {
    try {
        const userId = req.user.userId
        let notes = await getAllNotes(userId)
        if (notes.length == 0) {
            return res.json({
                success: true,
                notes: [],
            })
        }
        return res.send({
            success: true,
            notes: notes,
        })
    } catch (error) {
        return res.json({
            success: false,
            error: error.message,
        })
    }
    res.send('All notes')
})
router.post(
    '/addNote',
    fetchUser,
    [
        body('title', 'Title must be atleast 3 characters').isLength({
            min: 3,
        }),
        body('content', 'Content must be atleast 5 charcters').isLength({
            min: 5,
        }),
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            })
        }
        let note = {
            user_id: req.user.userId,
            title: req.body.title,
            content: req.body.content,
        }
        try {
            let response = await addNotes(note)
            return res.json({
                success: true,
                notesId: response.NotesId,
            })
        } catch (error) {
            res.status(401).json({
                success: false,
                error:
                    'Error occured While adding note\nERROR: ' +
                    error.toString(),
            })
        }
    }
)

router.put(
    '/updateNotes/:id',
    fetchUser,
    [
        body('title', 'Title must be atleast 3 characters').isLength({
            min: 3,
        }),
        body('content', 'Content must be atleast 5 charcters').isLength({
            min: 5,
        }),
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }
        const notesId = req.params.id
        const userId = req.user.userId
        try {
            let result = await getNotesById(notesId)

            if (result.length == 0 || result[0].user_id != userId) {
                return res.status(401).send('UnAuthorized acces denied')
            }
            const notes = {
                title: req.body.title,
                content: req.body.content,
            }
            let response = await updateNotes(notesId, notes)
            return res.send(response)
        } catch (error) {
            console.log(error)
            res.status(401).json({
                success: false,
                error: `error occured While updating note\nERROR : ${error.message}`,
            })
        }
    }
)
router.delete('/deleteNotes/:id', fetchUser, async (req, res) => {
    const notesId = req.params.id
    const userId = req.user.userId
    try {
        let result = await getNotesById(notesId)
        if (result.length == 0 || result[0].user_id != userId) {
            return res.status(401).send('Unauthorized acces denied')
        }
        let response = await deleteNotes(notesId)
        res.json({
            success: true,
            response,
        })
    } catch (error) {
        console.log(error)
        res.status(401).send('error occured While updating note')
    }
})

router.get('/getSingleNote/:id', fetchUser, async (req, res) => {
    const notesId = req.params.id
    const userId = req.user.userId
    try {
        let result = await getNotesById(notesId)
        if (result.length == 0 || result[0].user_id != userId) {
            return res.status(401).send('Unauthorized acces denied')
        }
        res.json({
            success: true,
            response: result[0],
        })
    } catch (error) {
        console.log(error)
        res.status(401).send('error occured While updating note')
    }
})

module.exports = router
