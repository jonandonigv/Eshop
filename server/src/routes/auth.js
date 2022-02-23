const router = require('express').Router();
const User = require('../models/User');
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');

// REGISTER
router.post('/register', async(req, res, next) => {});


// LOGIN
router.post('/login', async (req, res, next) => {});

module.exports = router;