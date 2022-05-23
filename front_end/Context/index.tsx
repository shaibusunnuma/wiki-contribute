import * as React from "react";
import { LatLng, Region } from "react-native-maps";
import { LocationObject } from "expo-location";
import { getDistance } from "geolib";
import * as Location from "expo-location";
import { Cache } from "react-native-cache";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SPARQLQueryDispatcher } from "../AppComponents/API/QueryDispatcher";
import { Addvariables, Editvariables, Entity, Mark } from "../AppComponents/CustomTypes";
import { WikiContextState } from "../AppComponents/CustomTypes";
import { PropertiesSPARQLQueryDispatcher } from "../AppComponents/API/PropertiesQueryDispatcher";
import contextDefaultData from "./DefaultData";
import propertySuggestions from "../data/properties.json";
import { useMutation } from "@apollo/client";
import { CREATE_PROPERTY_MUTATION, UPDATE_PROPERTY_MUTATION } from "../GraphQL/Mutations";
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

const WikiSyncCache = new Cache({
    namespace: "WikiSyncCache",
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
    const [updateProperty] = useMutation(UPDATE_PROPERTY_MUTATION);
    const [addProperty] = useMutation(CREATE_PROPERTY_MUTATION);
    const [cachedEdits, setCachedEdits] = React.useState([] as Editvariables[]);
    const [cachedAdditions, setCachedAdditions] = React.useState([] as Addvariables[]);
    const [showSnackBar, setShowSnackBar] = React.useState(false);
    const [snackBarMessage, setSnackBarMessage] = React.useState("");
    const [startSync, setStartSync] = React.useState(false);

    const WikiUpdateCachingHandler = async (instance: string, data: Editvariables | Addvariables) => {
        console.log("Caching Wiki Update...");
        if (instance == "WikiAdd") {
            console.log("Caching Wiki Addition...");
            cachedAdditions.push(data as Addvariables);
            console.log("Data:", cachedAdditions);
            UpdateWikiSyncCache(instance, cachedAdditions);
            setCachedAdditions(cachedAdditions);
        } else {
            console.log("Caching Wiki Edit...");
            cachedEdits.push(data as Editvariables);
            console.log("Data:", cachedEdits);
            UpdateWikiSyncCache(instance, cachedEdits);
            setCachedEdits(cachedEdits);
        }
    };

    const UpdateWikiSyncCache = async (instance: string, data: Editvariables[] | Addvariables[]) => {
        await WikiSyncCache.set(instance, JSON.stringify(data));
    };

    const createProperty = async (data: Addvariables) => {
        try {
            await addProperty({
                variables: data,
            });
        } catch (error) {
            return error;
        }
    };
    const editProperty = async (data: Editvariables) => {
        try {
            await updateProperty({
                variables: data,
            });
        } catch (error) {
            return error;
        }
    };

    const syncHandler = async () => {
        try {
            const syncEditData = cachedEdits;
            console.log("syncing...", syncEditData);
            if (syncEditData.length !== 0) {
                for (let i = syncEditData.length - 1; i >= 0; --i) {
                    const res = await editProperty(syncEditData[i]);
                    if (res.message && res.message.includes("Network request failed")) {
                        break;
                    }
                    syncEditData.splice(i, 1);
                    UpdateWikiSyncCache("WikiEdit", syncEditData);
                    setCachedEdits(syncEditData);
                }
            }
            const syncAddData = cachedAdditions;
            if (syncAddData.length !== 0) {
                for (let i = syncAddData.length - 1; i >= 0; --i) {
                    const res = await createProperty(syncAddData[i]);
                    if (res.message && res.message.includes("Network request failed")) {
                        break;
                    }
                    syncAddData.splice(i, 1);
                    UpdateWikiSyncCache("WikiAdd", syncAddData);
                    setCachedAdditions(syncAddData);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

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
                console.log("Querying wikidata...");
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
        } catch (error) {
            console.log(error);
            setSnackBarMessage("Error while loading data from Wikidata");
            setShowSnackBar(true);
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
        try {
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
        } catch (error) {
            console.log(error);
        }
    };

    const getUserLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setPermissionStatus("denied");
                setSnackBarMessage("Permission to access location was denied");
                setShowSnackBar(true);
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
                longitudeDelta: 0.8,
            } as Region);

            setUserLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        } catch (error) {
            setSnackBarMessage("Could not get user location");
            setShowSnackBar(true);
            console.log(error);
        }
    };

    //work on reducing the cachesize on settings
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
            setSnackBarMessage("Could not load properties");
            setShowSnackBar(true);
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
            const cacheEditData = await WikiSyncCache.get("WikiEdit");
            const cacheAdditionData = await WikiSyncCache.get("WikiAdd");

            //set state with cache data
            setUsername(username !== undefined ? username : "Username");
            setPassword(password !== undefined ? password : "");
            setCachedEdits(cacheEditData ? JSON.parse(cacheEditData) : []);
            setCachedAdditions(cacheAdditionData ? JSON.parse(cacheAdditionData) : []);
            const cache_size =
                Object.keys(allCachedProperties).length !== 0
                    ? JSON.stringify(allCachedMissingProperties).length + JSON.stringify(allCachedProperties).length
                    : 0;
            setPropertiesCacheSize(cache_size);

            setEntitiesCacheSize(entitiesCache !== undefined ? entitiesCache.length : 0);
            setQueryRange(queryRange !== undefined ? queryRange : "0.008");
            setLogin(username !== undefined && password !== undefined);

            //get user location
            getUserLocation();
        } catch (error) {
            console.log(error);
            setSnackBarMessage("Error while loading cache");
            setShowSnackBar(true);
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
        await WikiSyncCache.clearAll();
    };

    React.useEffect(() => {
        if (userLocation.latitude !== undefined) getData(); //TODO: check if queryRange could be unset before geting data
    }, [userLocation]);

    //TODO: check if this is the best way to do this
    React.useEffect(() => {
        if (startSync) {
            console.log("We are syncing...");
            const syncData = setInterval(() => {
                syncHandler();
            }, 10000);
            return function cleanup() {
                clearInterval(syncData);
            };
        }
    }, [startSync]);

    React.useEffect(() => {
        setStartSync(cachedEdits.length > 0 || cachedAdditions.length > 0);
    }, [cachedEdits, cachedAdditions]);

    React.useEffect(() => {
        clearAll();
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
                showSnackBar,
                snackBarMessage,
                setShowSnackBar,
                setSnackBarMessage,
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
