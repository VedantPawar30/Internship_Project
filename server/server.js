const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()

//Middlewares
app.use(express.json())

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

const PORT = process.env.PORT

const {connectDB} = require('./config/dbConnect')
connectDB()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


const searchRoute =require('./routes/searchRoute')
app.use('/api/search', searchRoute)

app.get('/', (req, res) => {
    res.send("Backend is running")
})