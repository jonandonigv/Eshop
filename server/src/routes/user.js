const User = require("../models/user");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../utils/isAuth");

const router = require("express").Router();

// UPDATE
router.put('/:id', verifyTokenAndAuthorization, (req, res, next) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

// DELETE
router.delete('/:id', verifyTokenAndAuthorization, (req, res, next) => {});

// GET USER

router.get('/find/:id', verifyTokenAndAdmin, (req, res, next) => {});

// GET ALL USER

router.get('/', verifyTokenAndAdmin, (req, res, next) => {});

// GET USER STATS

router.get('/stats', verifyTokenAndAdmin, (req, res, next) => {});