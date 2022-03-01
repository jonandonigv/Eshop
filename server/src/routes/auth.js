const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res, next) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJs.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// LOGIN
router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.username });

    !user && res.status(401).json("Wrong username");

    const hashedPassword = CryptoJs.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    );

    const originalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);

    const inputPassword = req.body.password;

    originalPassword != inputPassword && res.status(401).json("Wrong password");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.SECRET_KEY,
      { expiresIn: "3d" }
    );

    const {password, ...info} = user._doc;
    res.status(200).json({...others, accessToken});

  } catch (error) {
      res.status(500).json(error);
  }
});

module.exports = router;
