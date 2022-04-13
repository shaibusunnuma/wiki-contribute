import express from 'express';
import { Request, Response } from 'express';
import generalConfig from '../config'
const wbEdit = require('wikibase-edit')(generalConfig)

const router = express.Router();

router.get('/edit'), (async(req: Request, res: Response) => {
        try{
            wbEdit.entity.edit({
                id: 'Q494',
                labels: req.query.labels,
                descriptions: req.query.description,
                aliases: req.query.aliases,
                summary: req.query.summary,
            })
            res.status(200).send('Success');
        }catch(e){
            res.status(500).send('fail');
            console.log(e)
        }
    })

export default router;