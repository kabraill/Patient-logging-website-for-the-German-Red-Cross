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

  jwt.verify(token, 'blue-eyes', (err, decodedUser) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    //console.log(decodedToken.userId);
    //console.log(decodedToken.userId);
    req.decodedUser = decodedUser;
    console.log("req decoded user : " + req.decodedUser);
    console.log("decoded user : " + decodedUser);
    console.log("token for encode : " + token);
    next();
  });
}

// REGISTER
router.post("/register", async (req, res) => {
  try {

    // Check if the name has at least 4 letters
    if (!req.body.name || req.body.name.length < 4) {
      return res.json("Der Name muss zumindest 4 Buchstaben enthalten.");
    }

    // Check if the email has at least 5 letters
    if (!req.body.email || req.body.email.length < 5) {
      return res.json("Die Email muss zumindest 5 Buchstaben enthalten.");
    }

    // Check if the password has at least 6 letters
    if (!req.body.password || req.body.password.length < 6) {
      return res.json("Das Kennwort muss zumindest 6 Buchstaben enthalten");
    }

    const user_name = await User.findOne({ name: req.body.name })

    if (user_name) {
      return res.json("Der gleiche Name befindet sich schon");
    }

    const user_email = await User.findOne({ email: req.body.email })

    if (user_email) {
      return res.json("Die gleiche Email befindet sich schon");
    }
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
    return res.json(err);
  }
});

router.post("/mein_konto_laden", async (req, res) => {
  const id = req.headers['authorization'];

  console.log(id);
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.json("kein benutzer wurde gefunden");
    }

    res.status(200).json([user])
  } catch (err) {
    return res.status(500).json(err);
  }

})

router.post("/laden", async (req, res) => {
  const perm = req.headers['authorization'];

  try {

    if (req.body.text.includes("@")) {

      const users = await User.find({ email: req.body.text })

      if (users.length == 0) {
        return res.json("Kein Benutzer wurde gefunden");
      }

      let users_perm = []

      for (let usr of users) {
        if (perm.includes(usr.permission[0])) {
          users_perm.push(usr)
        }
      }

      if (users_perm.length == 0) {
        return res.json("Kein Benutzer wurde gefunden");
      }

      return res.status(200).json(users_perm);

    } else {

      const users = await User.find({ name: req.body.text })
      console.log(users.length)
      if (users.length == 0) {
        return res.json("Kein Benutzer wurde gefunden");
      }

      let users_perm = []

      for (let usr of users) {

        if (perm.includes(usr.permission[0])) {
          users_perm.push(usr)
        }
      }

      if (users_perm.length == 0) {
        return res.json("Kein Benutzer wurde gefunden");
      }

      return res.status(200).json(users_perm);

    }


  } catch (err) {
    return res.json(err);
  }


});

router.post("/alle_laden", async (req, res) => {

  try {
    const users = await User.find({});
    let users_perm = []

    for (let usr of users) {
      if (req.body.perm.includes(usr.permission[0]) || req.body.perm[0] === usr.name) {
        users_perm.push(usr)
      }
    }

    if (users_perm.length == 0) {
      return res.json("Kein Benutzer wurde gefunden");
    }

    return res.status(200).json(users_perm);

  } catch (err) {
    return res.json(err);
  }
})

router.put("/save", async (req, res) => {
  try {
    // Check if the name has at least 4 letters
    if (req.body.new_name.length < 4) {
      return res.json("Der Name muss zumindest 4 Buchstaben enthalten.");
    }

    // Check if the email has at least 5 letters
    if (req.body.email.length < 5) {
      return res.json("Die Email muss zumindest 5 Buchstaben enthalten.");
    }

    // Check if the password has at least 6 letters

   
    if (req.body.password.length < 6) {
      return res.json("Das Kennwort muss zumindest 6 Buchstaben enthalten");
    }


    const user = await User.find({ name: req.body.old_name });


    if (user.length == 0) {
      return res.json("Kein Benutzer wurde gefunden");
    }

    /*if (!req.body.new_name && !req.body.password && !req.body.email && !req.body.permission) {
      return res.json("Sie müssen zumindest ein Speicherkriterium auswählen");
    }*/


    //if (req.body.new_name) {
    const user_name = await User.findOne({ name: req.body.new_name })

    if (user_name) {
      return res.json("Der gleiche Name befindet sich schon");
    }
    user[0].name = req.body.new_name;
    //}

    //if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user[0].password = hashedPassword;
    //}

    //if (req.body.email) {
    const user_email = await User.findOne({ email: req.body.email })

    if (user_email) {
      return res.json("Die gleiche Email befindet sich schon");
    }
    user[0].email = req.body.email;
    //}

    //if (req.body.permission) {
    user[0].permission[0] = req.body.permission;
    //}


    //draft_proto.markModified(`content.${req.body.instance_index}`);
    await user[0].save();
    //console.log(draft_proto.content[req.body.instance_index].patient);
    return res.status(200).json(["good"]);

  } catch (error) {
    res.json(error);
  }
})

router.post("/delete", async (req, res) => {
  try {
    const user = await User.find({ name: req.body.name });

    if (user.length === 0) {

      return res.status(200).json("Kein Benutzer wurde gefunden");
    }

    await User.deleteOne({ name: req.body.name })

    return res.status(200).json(["good"]);

  } catch (error) {
    res.json(error);
  }
})

// LOGIN
router.post("/login", async (req, res) => {
  try {

    const user = await User.findOne({ name: req.body.name });
    if (!user) {
      return res.status(200).json("Benutzer nicht gefunden");
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (passwordMatch) {
      await user.save();
      const token = generateToken(user._id);
      //console.log(typeof(user._id))
      return res.status(200).json(token);
    } else {
      return res.status(200).json("Falsches Kennwort");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// decodeToken
router.post('/decodeToken', authenticateToken, async (req, res) => {
  const decodedUser = req.decodedUser;
  console.log("decodetoken : " + decodedUser);
  //console.log(new Date(user.exp * 1000));
  //console.log(user.userId)
  //const userId = req.user.userId;

  try {
    /*const user = await User.findById(userId);

    if (!user) {
      return res.sendStatus(404);
    }
    */


    return res.status(200).json(decodedUser);
  } catch (error) {
    res.sendStatus(500);
  }
});

// encodeToken
router.post('/encodeToken', async (req, res) => {


  try {

    const token = generateToken(req.body.id);
    return res.status(200).json(token);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get('/time', (req, res) => {
  const currentTime = Date.now();
  res.json(currentTime);
});

router.post('/get_user', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  const user = await User.findById(token);

  if (!user) {
    return res.status(200).json("Kein Benutzer wurde gefunden");
  }

  try {

    return res.status(200).json(user);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;