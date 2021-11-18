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
export const postCreateOneProduct = async () => {
    // TODO: Create one product from form.
};

/* 
    * CreateProductFromCSV
    * @route POST /createProductFromCSV
*/
export const postCreateProductFromCSV = async () => {

}