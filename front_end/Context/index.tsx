import * as React from "react";
import { LatLng, Region } from "react-native-maps";
import { LocationObject } from "expo-location";
import { getDistance } from "geolib";
import * as Location from "expo-location";
import { Cache } from "react-native-cache";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SPARQLQueryDispatcher } from "../AppComponents/API/QueryDispatcher";
import { Entity, Mark } from "../AppComponents/CustomTypes";
import { WikiContextState } from "../AppComponents/CustomTypes";
import { PropertiesSPARQLQueryDispatcher } from "../AppComponents/API/PropertiesQueryDispatcher";
import contextDefaultData from "./DefaultData";
import propertySuggestions from "../data/properties.json";
interface Props {
    children: JSX.Element;
}

const startUpCache = new Cache({
    namespace: "StartUpCache",
    policy: {
        maxEntries: 5000, // if unspecified, it can have unlimited entries
        stdTTL: 0, // the standard ttl as number in seconds, default: 0 (unlimited)
    },
    backend: AsyncStorage,
});

const EditCache = new Cache({
    namespace: "EditCache",
    policy: {
        maxEntries: 5000, // if unspecified, it can have unlimited entries
        stdTTL: 0, // the standard ttl as number in seconds, default: 0 (unlimited)
    },
    backend: AsyncStorage,
});

const propertiesCache = new Cache({
    namespace: "PropertiesCache",
    policy: {
        maxEntries: 50000,
        stdTTL: 0,
    },
    backend: AsyncStorage,
});

const missingPropertiesCache = new Cache({
    namespace: "MissingPropertiesCache",
    policy: {
        maxEntries: 5000,
        stdTTL: 0,
    },
    backend: AsyncStorage,
});

export const WikiContext = React.createContext<WikiContextState>(contextDefaultData);

export const WikiProvider = ({ children }: React.PropsWithChildren<Props>) => {
    const [selectedEntityQID, setSelectedEntityQID] = React.useState("");
    const [anonymous, setAnonymous] = React.useState(false);
    const [selectedPropertyPID, setSelectedPropertyPID] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [markers, setMarkers] = React.useState([] as Mark[]);
    const [loadingData, setLoadingData] = React.useState(true);
    const [login, setLogin] = React.useState(false);
    const [queryRange, setQueryRange] = React.useState("");
    const [entities, setEntities] = React.useState([] as Entity[]);
    const [userLocation, setUserLocation] = React.useState({} as LatLng);
    const [permissionStatus, setPermissionStatus] = React.useState("");
    const [region, setRegion] = React.useState({} as Region);
    const [trackLocation, setTrackLocation] = React.useState(false);
    const [properties, setProperties] = React.useState([]);
    const [missingProperties, setMissingProperties] = React.useState([]);
    const [entitiesCacheSize, setEntitiesCacheSize] = React.useState(0);
    const [refresh, setRefresh] = React.useState(false);
    const [propertiesCacheSize, setPropertiesCacheSize] = React.useState(0);
    const [address, setAddress] = React.useState({} as Location.LocationGeocodedAddress[]);
    const [propertySuggestionsList, setPropertySuggestionsList] = React.useState(propertySuggestions);

    const WikiUpdateCachingHandler = (instance: string, data: Object) => {
        if (instance == "add") {
            addCreateToCache(data);
        } else {
            addEditToCache(data);
        }
    };

    const addEditToCache = async (data: Object) => {
        const cacheData = await EditCache.get("Edits");
        if (cacheData) {
            const cacheDataArray = JSON.parse(cacheData);
            cacheDataArray.push(data);
            await EditCache.set("Edits", JSON.stringify(cacheDataArray));
        }
    };

    const addCreateToCache = async (data: Object) => {
        const cacheData = await EditCache.get("Adds");
        if (cacheData) {
            const cacheDataArray = JSON.parse(cacheData);
            cacheDataArray.push(data);
            await EditCache.set("Adds", JSON.stringify(cacheDataArray));
        }
    };

    //TODO: Create a handler to sync cached updates to the server
    const syncHandler = () => {};

    const getData = async () => {
        try {
            const cachedData = await startUpCache.get("wiki");
            if (cachedData !== undefined) {
                console.log("Getting data from cache...");
                const data = JSON.parse(cachedData);
                setEntities(data);
                setLoadingData(false);
                console.log("Data from cache loaded.");
            } else {
                console.log("Querying wikidata...", entitiesCacheSize);
                const queryDispatcher = new SPARQLQueryDispatcher(userLocation, address[0].city, queryRange);
                await queryDispatcher
                    .query()
                    .then((response) => {
                        setEntities(response.results.bindings);
                        setLoadingData(false);
                        console.log("Querying completed");
                        return response.results.bindings;
                    })
                    .then(async (response) => {
                        updateCacheSize("startUpCache", JSON.stringify(response).length);
                        await startUpCache.set("wiki", JSON.stringify(response));
                    });
            }
        } catch (e) {
            console.log("Fetch error :" + e);
        }
    };

    const refreshWiki = async () => {
        await clearCache("all");
        setMarkers([]);
        setLoadingData(true);
        setRefresh(true);
    };

    React.useEffect(() => {
        if (refresh) {
            getData();
            setRefresh(false);
        }
    }, [refresh]);

    const updateCacheSize = async (cache: string, dataSize: number) => {
        switch (cache) {
            case "startUpCache":
                setEntitiesCacheSize(entitiesCacheSize + dataSize);
                break;
            case "propertiesCache":
                setPropertiesCacheSize(propertiesCacheSize + dataSize);
                break;
            default:
                break;
        }
    };

    const getUserLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setPermissionStatus("Permission to access location was denied");
                return;
            }
            setPermissionStatus("granted");
            console.log("Getting user location...");
            const location = await Location.getCurrentPositionAsync({});
            const prev_location = await startUpCache.get("prev_location");
            if (prev_location !== undefined) {
                const oldloc = JSON.parse(prev_location) as LocationObject;
                const distance = getDistance(
                    {
                        latitude: oldloc.coords.latitude,
                        longitude: oldloc.coords.longitude,
                    },
                    {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    }
                );
                if (distance > 1000) {
                    await updateCacheSize("startUpCache", JSON.stringify(location).length); //TODO: check if this is necessary
                    await startUpCache.set("prev_location", JSON.stringify(location));
                    startUpCache.remove("wiki");
                }
            }

            const address = await Location.reverseGeocodeAsync(location.coords);
            setAddress(address);
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0,
                longitudeDelta: 0.01,
            } as Region);

            setUserLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        } catch (error: any) {
            console.log(error);
        }
    };

    //work on reducing the cache
    const reloadProperties = async () => {
        await propertiesCache.remove(selectedEntityQID);
        await missingPropertiesCache.remove(selectedEntityQID);
        await loadProperties(selectedEntityQID);
    };

    const loadProperties = async (qid: string) => {
        try {
            const cached_properties = await propertiesCache.get(qid);
            const cached_missing_properties = await missingPropertiesCache.get(qid);
            if (cached_properties !== undefined) {
                console.log("Getting properties from cache...");
                setProperties(JSON.parse(cached_properties));
                setMissingProperties(JSON.parse(cached_missing_properties));
            } else {
                console.log("Fetching properties and missing properties");
                let props: React.SetStateAction<any[]>;
                let missing_props: React.SetStateAction<any[]>;
                const queryDispatcher = new PropertiesSPARQLQueryDispatcher(qid);
                await queryDispatcher
                    .queryProperties()
                    .then((response) => {
                        props = response.results.bindings;
                        setProperties(props);
                    })
                    .then(async () => {
                        console.log("Adding properties to cache...");
                        updateCacheSize("propertiesCache", JSON.stringify(props).length);
                        await propertiesCache.set(qid, JSON.stringify(props));
                    });

                await queryDispatcher
                    .queryMissingProperties()
                    .then((response) => {
                        missing_props = response.missing_properties;
                        setMissingProperties(missing_props);
                    })
                    .then(async () => {
                        console.log("Adding missing properties to cache...");
                        updateCacheSize("propertiesCache", JSON.stringify(missing_props).length);
                        await missingPropertiesCache.set(qid, JSON.stringify(missing_props));
                    });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const clearCache = async (cacheInstance: string) => {
        switch (cacheInstance) {
            case "entitiesCache":
                await startUpCache.remove("wiki");
                setEntitiesCacheSize(0);
                break;
            case "propertiesCache":
                await propertiesCache.clearAll();
                await missingPropertiesCache.clearAll();
                setPropertiesCacheSize(0);
                break;
            case "all":
                setPropertiesCacheSize(0);
                setEntitiesCacheSize(0);
                await propertiesCache.clearAll();
                await missingPropertiesCache.clearAll();
                await startUpCache.remove("wiki");

                break;
            default:
                break;
        }
    };

    const StartUp = async () => {
        try {
            //get data from cache
            const username = await startUpCache.get("username");
            const password = await startUpCache.get("password");
            const allCachedProperties = await propertiesCache.getAll(); //returned as an object
            const allCachedMissingProperties = await missingPropertiesCache.getAll(); //returned as an object
            const entitiesCache = await startUpCache.get("wiki");
            const queryRange = await startUpCache.get("queryRange");

            //set state with cache data
            setUsername(username !== undefined ? username : "");
            setPassword(password !== undefined ? password : "");
            const cache_size =
                Object.keys(allCachedProperties).length !== 0
                    ? JSON.stringify(allCachedMissingProperties).length + JSON.stringify(allCachedProperties).length
                    : 0;
            console.log(cache_size);
            setPropertiesCacheSize(cache_size);

            setEntitiesCacheSize(entitiesCache !== undefined ? entitiesCache.length : 0);
            setQueryRange(queryRange !== undefined ? queryRange : "100");
            setLogin(username !== undefined && password !== undefined);

            //get user location
            getUserLocation();
        } catch (error) {
            console.log(error);
        }
    };

    const SetQueryRange = (range: string) => {
        setQueryRange(range);
        startUpCache.set("queryRange", range);
    };

    const cacheUserCredentials = async (username: string, password: string) => {
        await startUpCache.set("username", username);
        await startUpCache.set("password", password);
    };

    const setUserCredentials = async (username: string, password: string) => {
        try {
            setUsername(username);
            setPassword(password);
            setLogin(true);
            await cacheUserCredentials(username, password);
        } catch (err) {
            console.log(err);
        }
    };

    const clearAll = async () => {
        await propertiesCache.clearAll();
        await missingPropertiesCache.clearAll();
        await startUpCache.clearAll();
    };

    React.useEffect(() => {
        if (userLocation.latitude !== undefined) getData(); //TODO: check if queryRange could be unset before geting data
    }, [userLocation]);

    React.useEffect(() => {
        //clearAll();
        StartUp();
    }, []);

    return (
        <WikiContext.Provider
            value={{
                region,
                entities,
                loadingData,
                selectedEntityQID,
                anonymous,
                trackLocation,
                login,
                markers,
                properties,
                missingProperties,
                selectedPropertyPID,
                username,
                password,
                queryRange,
                propertySuggestionsList,
                entitiesCacheSize,
                propertiesCacheSize,
                WikiUpdateCachingHandler,
                reloadProperties,
                setPropertySuggestionsList,
                setSelectedPropertyPID,
                setUserLocation,
                SetQueryRange,
                setLoadingData,
                setMarkers,
                clearCache,
                loadProperties,
                refreshWiki,
                setSelectedEntityQID,
                setUserCredentials,
                setAnonymous,
                setTrackLocation,
                setLogin,
            }}
        >
            {children}
        </WikiContext.Provider>
    );
};

// const watchLocation = async () => {
//     if (permissionStatus === "granted") {
//         console.log("Tracking user location");
//         await Location.watchPositionAsync(
//             {
//                 accuracy: Location.Accuracy.High,
//                 timeInterval: 100000,
//                 distanceInterval: 80,
//             },
//             (newLocation) => {
//                 const distance = getDistance(
//                     {
//                         latitude: userLocation.latitude,
//                         longitude: userLocation.longitude,
//                     },
//                     {
//                         latitude: newLocation.coords.latitude,
//                         longitude: newLocation.coords.longitude,
//                     }
//                 );
//                 console.log(distance);
//                 // if(distance > 1000){
//                 //     setUserLocation({ latitude: newLocation.coords.latitude, longitude: newLocation.coords.longitude });

//                 // }
//             }
//         );
//     }
// };
