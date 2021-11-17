import nodemailer from 'nodemailer';
import {User, UserDocument, AuthToken} from '../models/user';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import Joi from 'joi';

const jwt = require('jsonwebtoken');

const schemaRegister = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(32).required,
});


/* 
    * Sign in using email and password.
    * @route POST /login
*/
export const postLogin = async (req: Request, res: Response, next: NextFunction) => {
    // TODO: Logs in the user into the app and returns a 200 status code.


    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).json({ error: "User not found" });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({error: 'invalid password'});

    res.status(200).json({
        error: null,
        data: 'Welcome'
    });

    const token = jwt.sign({
        email: user?.email,
        id: user?._id
    }, 'secret');

    res.header('auth-token', token).json({
        error: null,
        data: {token}
    });
};

/* 
    * Logs out the user.
    * @routes POST /logout
*/
export const postLogout = async (req: Request, res: Response, next: NextFunction) => {
    // TODO: Logs out the user account destroying the current session and returns a success code if everything goes ok.
}

/* 
    * Create a new local account.
    * @route POST /signup
*/
export const postSignup = async (req: Request, res: Response, next: NextFunction) => {
    // TODO: Create a new user. Can't exist two user with the same email or username.
    const { error } = schemaRegister.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: error.details[0].message,
        });
    }

    const isEmailExist = await User.findOne({email: req.body.email});
    if (isEmailExist) {
        return res.status(400).json({
            error: 'Email already exists'
        })
    }

    const user = new User({
        email: req.body.email,
        password: req.body.password,
        profile: {
            name: req.body.name,
            surname: req.body.surname,
            age: req.body.age,
            gender: req.body.gender,   
        }
    });
    try {
        const savedUser = await user.save();
        res.status(200).json({
            error: null,
            data: savedUser
        });
    } catch (error) {
        res.status(400).json({error});
    }
};

/* 
    * Get Profile
    * @route GET /account
*/
export const getAccount = (req: Request, res: Response, next: NextFunction) => {
    // TODO: Get's the user account data.
    /* if (req.isAuthenticated()){
        User.findOne({_id: req.user}).then((user) => {
            res.status(200).send(user);    
        }).catch(err => {
            console.log(err);
            res.status(404).send({msg: "User not found"});
        });
    } */
};

/* 
    * Update profile information
    * @route POST /account/profile
*/
export const postUpdateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // TODO: Updates the user profile
};

/* 
    * Update current password
    * @route POST /account/password
*/
export const postUpdatePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // TODO: Update the User password and and the user password token.
};

/* 
    * Delete user account
    *@route POST /account/delete
*/
export const postDeleteAccount = (req: Request, res: Response, next: NextFunction): void => {
    // TODO: Deletes the user account. User must be authenticated to be able to delete the account.
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
    // TODO: Reset Password.
};

/* 
    * Create a randon token, then the send user an email with a reset link
    * @route POST /forgot
*/
export const postForgot = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // TODO: Send an email with a reset token to change the password.
};