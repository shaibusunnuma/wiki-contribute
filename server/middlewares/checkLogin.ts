import  { Request, Response, NextFunction } from 'express';
import generalConfig from '../config';


export default function confirmLogin(req: Request, res: Response, next: NextFunction) {
    if (req.query.username === '' && req.query.password === '') {
        generalConfig.credentials.username = '';
        generalConfig.credentials.password = '';
        generalConfig.anonymous = true;
        console.log('User is not logged in');
    }else{
        generalConfig.credentials.username = req.query.username!.toString();
        generalConfig.credentials.password = req.query.password!.toString();
        generalConfig.anonymous = false;
    }
    next()
}