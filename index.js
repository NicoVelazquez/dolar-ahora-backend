const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const mongoose = require('mongoose');
const port = 3000;

const dolarRoutes = require('./routes/dolarRoutes');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

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
app.use('/dolar', dolarRoutes);

// Error handling
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
});


mongoose
    .connect(
        'mongodb+srv://admin:adminpassword@dolarahora.m34mb.mongodb.net/dolar?retryWrites=true&w=majority'
    )
    .then(() => {
        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        });
    })
    .catch(err => console.log(err));
