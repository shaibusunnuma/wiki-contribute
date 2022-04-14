/* eslint-disable @typescript-eslint/no-explicit-any */
import generalConfig from '../config'
const wbEdit = require('wikibase-edit')(generalConfig)

export const addProperty = async(args: { [argName: string]: any; }) => {
    try{
        wbEdit.claim.create({
            id: args.id,
            property: args.property,
            value: args.value,
        })
        return 'Success';
    }catch(e){
        console.log(e)
        return 'Fail';
    }
}

export const updateProperty = async(args: { [argName: string]: any; }) => {
    try{
        wbEdit.claim.update({
            id: args.id,
            property: args.property,
            oldValue: args.oldValue,
            newValue: args.newValue,
        })
        return 'Success';
    }catch(e){
        console.log(e)
        return 'Fail';
    }
}