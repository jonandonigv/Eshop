const User = require("../models/user");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../utils/isAuth");

const router = require("express").Router();

// UPDATE
router.put('/:id', verifyTokenAndAuthorization, (req, res, next) => {});

// DELETE
router.delete('/:id', verifyTokenAndAuthorization, (req, res, next) => {});

// GET USER

router.get('/find/:id', verifyTokenAndAdmin, (req, res, next) => {});

// GET ALL USER

router.get('/', verifyTokenAndAdmin, (req, res, next) => {});

// GET USER STATS

router.get('/stats', verifyTokenAndAdmin, (req, res, next) => {});