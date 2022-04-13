/* eslint-disable @typescript-eslint/no-non-null-assertion */
import  { Request, Response, NextFunction } from 'express';
import generalConfig from '../config';


export default function confirmLogin(req: Request, res: Response, next: NextFunction) {
    if(req.query.username == undefined || req.query.password == undefined){
        generalConfig.credentials.username = 'client';
        generalConfig.credentials.password = 'clientpassword';
        generalConfig.anonymous = true;
    }else{
        generalConfig.credentials.username = req.query.username!.toString();
        generalConfig.credentials.password = req.query.password!.toString();
        generalConfig.anonymous = false;
    }
    next()
}