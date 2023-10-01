const express = require('express')
const bodyParser = require('body-parser')
const CORS = require('cors')
const app = express()

const connection = require('./configs/db')
const authRouter = require('./routes/auth')
const notesRouter = require('./routes/notes')
const PORT = process.env.PORT || 8080
app.use(CORS())
app.use(express.json())
app.use(bodyParser.json())
// connected to db from connect method
connection.connect((error) => {
    if (error) {
        console.error('Error connecting to the database:', error)
        return
    }
    console.log('Connected to the database.')
})

app.use('/api/auth', authRouter)
app.use('/notes', notesRouter)
app.get('/', (req, res) => {
    res.json({ message: 'Home file' })
})

app.listen(8080, () => {
    console.log(`app is running at http://localhost:${PORT}`)
})
