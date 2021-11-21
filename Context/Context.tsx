import React from 'react';
import { LatLng } from 'react-native-maps';
import {LocationObject} from 'expo-location';

import {SPARQLQueryDispatcher} from '../AppComponents/API/QueryDispatcher';
import {Entity} from '../AppComponents/CustomTypes';
import {WikiContextState} from '../AppComponents/CustomTypes';

const contextDefaultData: WikiContextState = {
    entities: [],
    setUserLocation: () => {},

}

interface Props {
    children: JSX.Element
}

export const WikiContext = React.createContext<WikiContextState>(contextDefaultData);

export const WikiProvider = ({children}: React.PropsWithChildren<Props>) =>{
    const [entities, setEntities] = React.useState([] as Entity[]);
    const [userLocation, setUserLocation] = React.useState({} as LocationObject['coords']);

    const getData = () => {
        const queryDispatcher = new SPARQLQueryDispatcher({latitude: 48.8738, longitude: 2.2950} as LatLng );
        queryDispatcher.query()
        .then( response => {
            setEntities(response.results.bindings);
        });
    
    }

    React.useEffect(() => {
        if(userLocation.latitude !== undefined)
            getData();
    },[userLocation]);

    return (
        <WikiContext.Provider value={{entities, setUserLocation}}>{children}</WikiContext.Provider>
    )
}


