// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const router = express.Router();


//test

router.get('/',(req,res)=>{
  return res.json({"status":"hello test 2"})
})
// Register
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Check if user already exists
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
    if (row) {
      return res.status(400).json({ message: 'User already exists' });
    } else {
      db.run(
        `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
        [username, email, password],
        (err) => {
          if (err) {
            return res.status(500).json({ message: 'Error registering user' });
          }
          res.status(201).json({ message: 'User registered successfully' });
        }
      );
    }
  });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = password=== user.password;
    console.log(isMatch,user)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});

module.exports = router;
