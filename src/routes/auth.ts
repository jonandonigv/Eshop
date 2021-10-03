import path from 'path';
import express from 'express';
import { Router } from 'express';
import { body } from 'express-validator';

import {User} from '../models/user';
import * as authController from '../controllers/user';

const router = Router();

router.post('/signin', [
    body('email').isEmail().withMessage('Please enter a valid Email')
    /* .custom((value: string, {req}) => {
        return User.findOne({email:value}).then((userDoc: any) => {
            if (userDoc) {
                return Promise.reject('E-mail already exist!')
            }
        });
    }) */
    .normalizeEmail(),
    body('password').trim().isLength({min: 6}),
    body('name').trim().not().isEmpty()
], authController.signIn);

router.post('/signup', authController.signUp);

router.delete('/deleteAccount', authController.deleteAccount);

export {router};