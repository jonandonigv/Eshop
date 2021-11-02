import async from 'async';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import passport from 'passport';
import {User, UserDocument, AuthToken} from '../models/user';
import { Request, Response, NextFunction } from 'express';
import { IVerifyOptions } from 'passport-local';
import { WriteError } from 'mongodb';
import { body, check, validationResult } from 'express-validator';
import '../config/passport';
import { CallbackError, NativeError } from 'mongoose';
import { json } from 'stream/consumers';

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

    passport.authenticate("local", (err: Error, user: UserDocument, info: IVerifyOptions) => {
        if (err) { return next(err); }
        if (!user) {
            req.flash("errors", {msg: info.message});
            return res.status(400).send({msg: info.message});
        }
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            req.flash("success", {msg: "Success! You are logged in."});
            res.status(200).send({msg: "Success"});
        });
    })(req, res, next)
};

/* 
    * Create a new local account.
    * @route POST /signup
*/
export const postSignup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await check("email", "Email is not valid").isEmail().run(req);
    await check("password", "Password must be at least 6 character long").isLength({min: 6}).run(req);
    await check("confirmPassword", "Password does not match").equals(req.body.password).run(req);
    await body("email").normalizeEmail({ gmail_remove_dots: false }).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).send({errors: errors});
    }

    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    User.findOne({ email: req.body.email }, (err: NativeError, existingUser: UserDocument) => {
        if (err) { return next(err); }
        if (existingUser) {
            res.status(401).send({msg: "Account with that email address already exists"});
        }
        user.save((err) => {
            if (err) { return next(err); }
            req.logIn(user, (err) => {
                if (err) { return next(err); }
                res.status(201).send({msg: "Account created correctly"});
            });
        });
    });
};

/* 
    * Get Profile
    * @route GET /account
*/
export const getAccount = (req: Request, res: Response, next: NextFunction) => {
    // TODO: Should get user data and fetch that data.
    if (req.isAuthenticated()){
        User.findOne({_id: req.user}).then((user) => {
            res.status(200).send(user);    
        }).catch(err => {
            console.log(err);
            res.status(404).send({msg: "User not found"});
        });
    }
};

/* 
    * Update profile information
    * @route POST /account/profile
*/
export const postUpdateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

};

/* 
    * Update current password
    * @route POST /account/password
*/
export const postUpdatePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

};

/* 
    * Delete user account
    *@route POST /account/delete
*/
export const postDeleteAccount = (req: Request, res: Response, next: NextFunction): void => {

};

/* 
    * Unlink OAuth provider
    * @route GET /account/unlink/:provider
*/
export const getOauthUnlink = (req: Request, res: Response, next: NextFunction): void => {

};

/* 
    * Reset Password
    * @route POST /reset/:token
*/
export const postReset = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

};

/* 
    * Create a randon token, then the send user an email with a reset link
    * @route POST /forgot
*/
export const postForgot = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

};