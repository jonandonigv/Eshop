const Product = require('../models/Product');
const {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization
} = require('../utils/isAuth');

const router = require('express').Router();

// CREATE

router.post('/', verifyTokenAndAdmin, async (req, res, next) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
});

// UPDATE

router.put('/:id', verifyTokenAndAdmin, async (req, res, next) => {});

// DELETE

router.delete('/:id', verifyTokenAndAdmin, async (req, res, next) => {});

// GET PRODUCT

router.get('/find/:id', async (req, res, next) => {});

// GET ALL PRODUCTS

router.get('/', async (req, res, next) => {});

module.exports = router;