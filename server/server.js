
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import mongoose from 'mongoose';
const morgan = require('morgan');
require("dotenv").config()


// create express app
const app = express();

// database connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then( () => console.log('Database connected'))
.catch((err) => console.log('Database connection problem', err))


// apply middlewires
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// routes
fs.readdirSync('./routes').map((r) => {
    app.use('/api', require(`./routes/${r}`))
})


// port connection
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})