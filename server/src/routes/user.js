const User = require('../models/User');
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../utils/isAuth");

const router = require("express").Router();

// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res, next) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET USER

router.get("/find/:id", verifyTokenAndAdmin, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL USER

router.get("/", verifyTokenAndAdmin, async (req, res, next) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET USER STATS

router.get("/stats", verifyTokenAndAdmin, async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
