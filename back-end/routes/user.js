const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// Generate JWT token
function generateToken(userId) {
  
  return jwt.sign({ userId }, 'blue-eyes', { expiresIn: '100d' });
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

// REGISTER
router.post("/register", async (req, res) => {
  try {
    // Generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      id_last_opened_protocol: "",
      permission: req.body.permission,
      statistics_permission: req.body.statistics_permission,
      own_finished_protocols: [],
    });

    // Save user and respond
    const user = await newUser.save();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) {
      return res.status(404).json({ message: "Benutzer nicht gefunden" });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (passwordMatch) {
      await user.save();
      const token = generateToken(user._id);
      return res.status(200).json(token);
    } else {
      return res.status(401).json({ message: "Falsches Kennwort" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// decodeToken
router.post('/decodeToken', authenticateToken, async (req, res) => {
  const user = req.user;
  console.log(new Date(user.exp * 1000));
  console.log(user.userId)
  //const userId = req.user.userId;

  try {
    /*const user = await User.findById(userId);

    if (!user) {
      return res.sendStatus(404);
    }
    */

    
    return res.status(200).json(user);
  } catch (error) {
    res.sendStatus(500);
  }
});

// decodeToken
router.post('/encodeToken', async (req, res) => {
  

  try {
    
    const token = generateToken(req.id);
    return res.status(200).json(token);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get('/time', (req, res) => {
  const currentTime = Date.now();
  res.json(currentTime);
});

module.exports = router;