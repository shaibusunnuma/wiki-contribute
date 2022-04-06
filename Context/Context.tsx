import React from 'react';
import { LatLng, Region } from 'react-native-maps';
import { LocationObject } from 'expo-location';
import { getDistance } from 'geolib';
import * as Location from 'expo-location';
import { Cache } from "react-native-cache";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SPARQLQueryDispatcher } from '../AppComponents/API/QueryDispatcher';
import {Entity} from '../AppComponents/CustomTypes';
import {WikiContextState} from '../AppComponents/CustomTypes';

const contextDefaultData: WikiContextState = {
    region: {} as Region,
    entities: [],
    setUserLocation: () => {},
}

interface Props {
    children: JSX.Element
}

const cache = new Cache({
    namespace: "WikiContext",
    policy: {
        maxEntries: 50000, // if unspecified, it can have unlimited entries
        stdTTL: 0 // the standard ttl as number in seconds, default: 0 (unlimited)
    },
    backend: AsyncStorage
});

export const WikiContext = React.createContext<WikiContextState>(contextDefaultData);

export const WikiProvider = ({children}: React.PropsWithChildren<Props>) =>{
    const [entities, setEntities] = React.useState([] as Entity[]);
    const [userLocation, setUserLocation] = React.useState({} as LatLng);
    const [permissionStatus, setPermissionStatus] = React.useState('');
    const [region, setRegion] = React.useState({} as Region);
    const [address, setAddress] = React.useState({} as Location.LocationGeocodedAddress[]);

    

    const getUserLocation = async() => {
        const { status } = await  Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            setPermissionStatus('Permission to access location was denied');
            return;
        }

        let location: LocationObject  = {} as LocationObject;

        const prev_location = await cache.get('prev_location');
        if(prev_location !== undefined){
            location = JSON.parse(prev_location);
        }else{
            console.log('Getting user location...');
            setPermissionStatus('granted');
            location = await Location.getCurrentPositionAsync({});
        }
        const address = await Location.reverseGeocodeAsync(location.coords);
        setAddress(address)
        setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.05922,
            longitudeDelta: 0.01421
        } as Region);
        await cache.set("prev_location", JSON.stringify(location));
        setUserLocation({latitude: location.coords.latitude, longitude: location.coords.longitude});
        
   }


    const watch_location = async () => {  
        if (permissionStatus === 'granted') {     
            console.log('Tracking user location');
            let location = await Location.watchPositionAsync({
                accuracy:Location.Accuracy.High,
                timeInterval: 10000,
                distanceInterval: 80,
            },
            (newLocation)=> {
                const distance = getDistance(
                    { latitude: userLocation.latitude, longitude: userLocation.longitude },
                    { latitude: newLocation.coords.latitude, longitude: newLocation.coords.longitude }
                );
                console.log(distance)
                // if(distance > 1000){
                //     setUserLocation({ latitude: newLocation.coords.latitude, longitude: newLocation.coords.longitude });

                // }         
            }
            )
        }
    }

    const GetDistance = (prevLocation: {latitude: string, longitude: string}) => {
        const distance = getDistance(
            { latitude: userLocation.latitude, longitude: userLocation.longitude },
            { latitude: prevLocation.latitude, longitude: prevLocation.longitude }
        )
        return distance;
    }

    const getData = async() => {
        try{
            // const cachedData = await cache.get("wiki");
            // cache.remove('wiki');
            // const prev_location = await cache.get('prev_location');
            // if(cachedData !== undefined && prev_location !== undefined){
            //     if(GetDistance(JSON.parse(prev_location)) < 1000)
            //     console.log('Getting data from cache...');
            //     const data = JSON.parse(cachedData);
            //     setEntities(data);
            // }else{
                console.log('Querying wikidata...')
                const queryDispatcher = new SPARQLQueryDispatcher(userLocation, address[0].city);
                queryDispatcher.query()
                .then( response => {
                    //console.log(response.results.bindings)
                    setEntities(response.results.bindings);
                    return response.results.bindings;
                })
                .then(async(response)=>{
                    await cache.set("wiki", JSON.stringify(response));
                })
            //}
        }catch(error){
            console.log(error);
        }
        
    
    }

    React.useEffect(() => {
        if(userLocation.latitude !== undefined) getData();
        else getUserLocation();
        
    },[userLocation]);

    // React.useEffect(() =>{
    //     if(userLocation.latitude !== undefined) watch_location();
    // },[permissionStatus, userLocation]);

    return (
        <WikiContext.Provider value={{region, entities, setUserLocation}}>{children}</WikiContext.Provider>
    )
}


