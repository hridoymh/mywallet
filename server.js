// server.js
require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth');
const app = express();
const PORT = 0;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.get("/",(req,res)=>{
    return res.json({"status":"working"})
})

app.listen(9001);
