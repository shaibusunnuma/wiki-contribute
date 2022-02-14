import React from 'react';
import { LatLng } from 'react-native-maps';
import { LocationObject } from 'expo-location';
import { Cache } from "react-native-cache";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SPARQLQueryDispatcher } from '../AppComponents/API/QueryDispatcher';
import {Entity} from '../AppComponents/CustomTypes';
import {WikiContextState} from '../AppComponents/CustomTypes';

const contextDefaultData: WikiContextState = {
    entities: [],
    setUserLocation: () => {},

}

interface Props {
    children: JSX.Element
}

const cache = new Cache({
    namespace: "myapp",
    policy: {
        maxEntries: 50000, // if unspecified, it can have unlimited entries
        stdTTL: 0 // the standard ttl as number in seconds, default: 0 (unlimited)
    },
    backend: AsyncStorage
});

export const WikiContext = React.createContext<WikiContextState>(contextDefaultData);

export const WikiProvider = ({children}: React.PropsWithChildren<Props>) =>{
    const [entities, setEntities] = React.useState([] as Entity[]);
    const [userLocation, setUserLocation] = React.useState({} as LocationObject['coords']);

    const getData = async() => {
        try{
            //await cache.remove('wiki');
            const cachedData = await cache.get("wiki");
            if(cachedData !== undefined){
                const data = JSON.parse(cachedData);

                setEntities(data);
                //console.log(data);
            }else{
                console.log('Querying this time');
                const queryDispatcher = new SPARQLQueryDispatcher({latitude: 48.8738, longitude: 2.2950} as LatLng );
                queryDispatcher.query()
                .then( response => {
                    setEntities(response.results.bindings);
                    return response.results.bindings;
                })
                .then(async(response)=>{
                    await cache.set("wiki", JSON.stringify(response));
                })
            }
        }catch(e){
            console.log(e);
        }
        
    
    }

    React.useEffect(() => {
        if(userLocation.latitude !== undefined)
            getData();
    },[userLocation]);

    return (
        <WikiContext.Provider value={{entities, setUserLocation}}>{children}</WikiContext.Provider>
    )
}


