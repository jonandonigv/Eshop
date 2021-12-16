import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { Product, ProductDocument } from '../models/product';
import { Request, Response, NextFunction } from 'express';

/* 
    * Get all products
    * @route GET /products
*/
export const getAllProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Get all products
};

/* 
    * Get product detail
    * @route GET /products
*/
export const getProductDetail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Get all products
};

/* 
    * Create new Product
    * @route POST /createProduct
*/
export const postCreateOneProduct = async (req: Request, res: Response, next: NextFunction) => {
    // TODO: Create one product from form.
    const product = new Product({
        productName: req.body.productName,
        category: req.body.category,
        subcategory: {
            type: req.body.subcategory.type,
            color: [{
                name: req.body.color.name
            }],
            size: [{
                val: req.body.size.val,
            }]
        },
        description: req.body.description,
        picture: req.body.picture,
    });
    console.log(product);
    /* try{
        const savedProduct = await product.save();
        res.status(200).json({
            error: null,
            data: savedProduct,
        })
    } catch (error) {
        res.status(400).json({error});
    } */
    

};

/* 
    * CreateProductFromCSV
    * @route POST /createProductFromCSV
*/
export const postCreateProductFromCSV = async () => {

}