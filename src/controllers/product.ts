import async from 'async';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import passport from 'passport';
import { Product, ProductDocument } from '../models/product';
import { Request, Response, NextFunction } from 'express';
import { IVerifyOptions } from 'passport-local';
import { WriteError } from 'mongodb';
import { body, check, validationResult } from 'express-validator';
import '../config/default';
import { CallbackError, NativeError } from 'mongoose';

/* 
    * Get all products
    * @route GET /products
*/
export const getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Get all the products
};

/* 
    * Create new Product
    * @route POST /createProduct
*/