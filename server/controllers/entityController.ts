/* eslint-disable @typescript-eslint/no-non-null-assertion */
import express from 'express';
import { Request, Response } from 'express';
import generalConfig from '../config'
const wbEdit = require('wikibase-edit')(generalConfig)

const router = express.Router();

router.get('/edit', async(req: Request, res: Response) => {
    try{
        wbEdit.entity.edit({
            id: req.query.id,
            labels: JSON.parse(req.query.labels!.toString()),
            descriptions: JSON.parse(req.query.descriptions!.toString()),
            aliases: JSON.parse(req.query.aliases!.toString()),
            summary: 'Edited'
        })
        res.status(200).send('Success');
    }catch(e){
        res.status(500).send('fail');
        console.log(e)
    }
})

//TODO: add controller for create entity and add entity

router.get('/label'), (async(req: Request, res: Response) => {
    try{
        wbEdit.label.set({
            id: req.query.id,
            language: req.query.language,
            value: req.query.value,
        })
        res.status(200).send('Success');
    }catch(e){
        res.status(500).send('fail');
        console.log(e)
    }
})

router.get('/description'), (async(req: Request, res: Response) => {
    try{
        wbEdit.description.set({
            id: req.query.id,
            language: req.query.language,
            value: req.query.value,
        })
        res.status(200).send('Success');
    }catch(e){
        res.status(500).send('fail');
        console.log(e)
    }
})

router.get('/alias'), (async(req: Request, res: Response) => {
    try{
        wbEdit.description.add({
            id: req.query.id,
            language: req.query.language,
            value: req.query.value, //TODO pass an array
        })
        res.status(200).send('Success');
    }catch(e){
        res.status(500).send('fail');
        console.log(e)
    }
})

export default router;