const express = require('express');
const bodyParser = require("body-parser");
const CORS = require('cors')
const app = express();

const connection = require('./configs/db')
const authRouter = require('./routes/auth')
const notesRouter =require('./routes/notes')
const PORT = process.env.PORT || 8080;
app.use(CORS());
app.use(express.json());
app.use(bodyParser.json());
// connected to db from connect method
connection.connect((error) => {
    if (error) {
        console.error('Error connecting to the database:', error);
        return;
    }
    console.log('Connected to the database.');
});

connection.query(`CREATE TABLE Users (
    id VARCHAR(36) NOT NULL DEFAULT (UUID()),
    username VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    email VARCHAR(255) NOT NULL unique,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  )`,(error)=>{
    if(error)
    console.log(error.sqlMessage);
  });
  connection.query(`CREATE TABLE Notes (
    id VARCHAR(36) NOT NULL DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
)`,(error)=>{
    if(error)
      console.log(error.sqlMessage);
  })

app.use('/api/auth',authRouter);
app.use('/notes',notesRouter)
app.get('/', (req, res) => {
    res.json({ message: "Home file" })
});

app.listen(8080, () => {
    console.log(`app is running at http://localhost:${PORT}`);
});