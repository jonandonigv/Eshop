const Product = require('../models/Product');
const {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization
} = require('../utils/isAuth');

const router = require('express').Router();

// CREATE

router.post('/', verifyTokenAndAdmin, async (req, res, next) => {});

// UPDATE

router.put('/:id', verifyTokenAndAdmin, async (req, res, next) => {});

// DELETE

router.delete('/:id', verifyTokenAndAdmin, async (req, res, next) => {});

// GET PRODUCT

router.get('/find/:id', async (req, res, next) => {});

// GET ALL PRODUCTS

router.get('/', async (req, res, next) => {});

module.exports = router;