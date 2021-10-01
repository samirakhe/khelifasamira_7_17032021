const express = require('express');
const app = express();
const mysql = require('mysql2');
const userRoutes = require('./backend/routes/users');
const postRoutes = require('./backend/routes/posts');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

module.exports = app;