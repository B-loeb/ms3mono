//Modules and Globals
require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const app = express();
//Express
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
//db
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.use(express.json());

app.listen(5000, () => {
    console.log(`Server Started at ${5000}`)
})
