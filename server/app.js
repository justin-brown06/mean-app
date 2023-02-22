const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://brownee06:brownee06@meanappdb.tal6js8.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed!');
    });

const app = express();

app.use((req, res, next) => {
    console.log('This is the first middleware');
    next();
});

app.use((req, res, next) => {
    console.log('This is the second middleware');
    res.send('Hello from Express!');
});

module.exports = app;