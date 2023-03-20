
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require("dotenv").config()


// create express app
const app = express();


// apply middlewires
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// routes
app.get('/', (req, res) => {
    res.send('server started')
})


// port connection
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})