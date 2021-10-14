import async from 'async';
import crypto from 'crypto';
import nodemailer form 'nodemailer';
import passport from 'passport';
import {User, UserDocument, AuthToken} from '../models/user';
import { Request, Response, NextFunction } from 'express';
import { IVerifyOptions } from 'passport-local';
import { WriteError } from 'mongodb';
import { body, check, validationResult } from 'express-validator';
import '../config/passport';
import { CallbackError, NativeError } from 'mongoose';

/* 
    * Sign in using email and password.
    * @route POST /login
*/
export const postLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await check('email', 'Email is not valid').isEmail().run(req);
    await check('password', 'Password cannot be blank').isLength({min: 1}).run(req);
    await body('email').normalizeEmail({ gmail_remove_dots: false }).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash('errors', errors.array());
        res.status(400).json(errors).send({ message: 'Error' });
    }
};
