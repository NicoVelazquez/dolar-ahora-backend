if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const compression = require('compression');


const app = express();
app.use(compression());

const dollarRoutes = require('./routes/dolarRoutes');
const newsRoutes = require('./routes/newsRoutes');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

// Static serve files
app.use(express.static(path.join(__dirname, 'dist')));

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Routes
app.use('/dollar', dollarRoutes);
app.use('/news', newsRoutes);

// Static files
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handling
app.use((error, req, res) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
});


mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Example app listening at port:${process.env.PORT}`)
        });
    })
    .catch(err => console.log(err));
