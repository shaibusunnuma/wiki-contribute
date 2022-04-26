/* eslint-disable @typescript-eslint/no-explicit-any */
import generalConfig from '../config'
const wbEdit = require('wikibase-edit')(generalConfig)

export const addProperty = async (args: { [argName: string]: any; }) => {
    generalConfig.credentials = {
        username: args.username,
        password: args.password,
    }
    try {
        await wbEdit.claim.create({
            id: args.id,
            property: args.property,
            value: args.value,
        }, generalConfig)
    }
    catch (err) {
        return err;
    }

}

export const updateProperty = async (args: { [argName: string]: any; }) => {
    generalConfig.credentials = {
        username: args.username,
        password: args.password,
    }
    generalConfig.anonymous = args.anonymous;
    try {
        await wbEdit.claim.update({
            id: args.id,
            property: args.property,
            oldValue: args.oldValue,
            newValue: args.newValue,
        }, generalConfig)
    } catch (err) {
        return err;
    }
}