const router = require("express").Router();
const DraftProtocol = require("../models/protocol_draft");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// Generate JWT token
function generateToken(draft_protocol_id) {
    return jwt.sign({ draft_protocol_id }, 'blue-eyes', { expiresIn: '100d' });
}

// Middleware to authenticate token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    jwt.verify(token, 'blue-eyes', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}

router.post('/create', async (req, res) => {
    try {
      // Create a new protocol instance
      const new_draft_Protocol = new DraftProtocol(req.body);
      // Save the protocol to the database
      const saved_draft_Protocol = await new_draft_Protocol.save();
      const protocol_id_token = generateToken(saved_draft_Protocol._id);
      
      res.json(protocol_id_token);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

router.get('/time', (req, res) => {
    const currentTime = Date.now();
    res.json(currentTime);
});

module.exports = router;