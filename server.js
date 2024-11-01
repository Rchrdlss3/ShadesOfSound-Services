require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const db = mongoose.connection;
const spotifyRoute = require('./routes/spotifyRoutes');
const openAIRoute = require('./routes/openAIRoutes');
// We're going to use AI to describe the colors of the album
// Get similar artist 

async function connect(){
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("connected")
    } catch (e) {
        console.log(e)
    }
}

const corsOptions = {
    origin: ['http://localhost:3000','http://localhost:3001']
}

app.listen(3001)
app.use(express.json())
app.use(cors(corsOptions))
app.use('/spotify',spotifyRoute)
app.use('/ai',openAIRoute)
connect();