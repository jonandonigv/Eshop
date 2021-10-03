import express, { Response, Request, NextFunction } from 'express';
import 'bcryptjs';
import jwt from 'jsonwebtoken';
import {validationResult} from 'express-validator'

export const signIn = async ((req: Request, res: Response, next: NextFunction) => {
    // pass
})

