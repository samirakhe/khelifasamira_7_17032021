const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const userRoutes = require('./backend/routes/users');
const postRoutes = require('./backend/routes/posts');
const commentaireRoutes =  require('./backend/routes/commentaires');
const likesRoutes = require('./backend/routes/likes');


// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
// });

app.use(cors({origin: "*"}));
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/commentaires', commentaireRoutes);
app.use('/api/likes', likesRoutes);

module.exports = app;