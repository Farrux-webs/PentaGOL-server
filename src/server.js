require("express-async-errors")
const express = require('express')
const connectDB = require('./config/db')
const fileUpload = require("express-fileupload");
const path = require('path')
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT || 5000

//Connect to database
connectDB()

const app = express()
app.use(express.static(path.join(__dirname, "uploads")));



const cookeiPares = require("cookie-parser");

app.use(cookeiPares())
app.use(fileUpload())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

// app.use(verif_Token)  
app.use('/api/travel', require('./routes'))


app.use((error, req, res, next)=>{
    if (error) {
      return res.status(500).json({message: error.message})
    }
    next()
})



app.listen(PORT, console.log(`Server listening on port: ${PORT}`))