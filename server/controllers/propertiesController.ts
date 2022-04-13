import express from 'express';
import { Request, Response } from 'express';
import generalConfig from '../config'
const wbEdit = require('wikibase-edit')(generalConfig)

const router = express.Router();

router.get('/create'), (async(req: Request, res: Response) => {
    try{
        wbEdit.claim.create({
            id: req.query.id,
            property: req.query.property,
            value: req.query.value,
        })
        res.status(200).send('Success');
    }catch(e){
        console.log(e)
        res.status(500).send('fail');
    }
})

router.get('/update'), (async(req: Request, res: Response) => {
    try{
        wbEdit.claim.update({
            id: req.query.id,
            property: req.query.property,
            oldValue: req.query.oldValue,
            newValue: req.query.newValue,
        })
        res.status(200).send('Success');
    }catch(e){
        console.log(e)
        res.status(500).send('fail');
    }
})

export default router;