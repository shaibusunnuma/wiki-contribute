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

const contextDefaultData: WikiContextState = {
  region: {} as Region,
  entities: [],
  setUserLocation: () => {},
  selectedEntityQID: "",
  setSelectedEntityQID: () => {},
  selectedPropertyPID: "",
  setSelectedPropertyPID: () => {},
  clearCache: () => {},
  refreshWiki: () => {},
  setQueryRange: () => {},
  setUserCredentials: (user_name: string, password: string) => {},
  username: "",
  password: "",
  queryRange: "",
  loadingData: false,
  anonymous: false,
  setLoadingData: () => {},
  setMarkers: () => {},
  setAnonymous: () => {},
  markers: [] as Mark[],
  loadProperties: (qid: string) => {},
  properties: [],
  missingProperties: [],
};

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

export const WikiContext =
  React.createContext<WikiContextState>(contextDefaultData);

export const WikiProvider = ({ children }: React.PropsWithChildren<Props>) => {
  const [selectedEntityQID, setSelectedEntityQID] = React.useState("");
  const [anonymous, setAnonymous] = React.useState(false);
  const [selectedPropertyPID, setSelectedPropertyPID] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [markers, setMarkers] = React.useState([] as Mark[]);
  const [loadingData, setLoadingData] = React.useState(true);
  const [queryRange, setQueryRange] = React.useState("0.008");
  const [entities, setEntities] = React.useState([] as Entity[]);
  const [userLocation, setUserLocation] = React.useState({} as LatLng);
  const [permissionStatus, setPermissionStatus] = React.useState("");
  const [region, setRegion] = React.useState({} as Region);
  const [address, setAddress] = React.useState(
    {} as Location.LocationGeocodedAddress[]
  );
  const [properties, setProperties] = React.useState([]);
  const [missingProperties, setMissingProperties] = React.useState([]);

  const getUserLocation = async () => {
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
      console.log(distance);
      if (distance > 1000) {
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
  };

  const addPropertiesToCache = async (
    qid: string,
    properties: string,
    missingProperties: string
  ) => {
    console.log(properties);
    const cached_properties = await propertiesCache.get(qid);
    const cached_missing_properties = await missingPropertiesCache.get(qid);
    if (cached_properties === undefined) {
      console.log("Adding properties to cache...");
      await propertiesCache.set(qid, properties);
    }
    if (cached_missing_properties === undefined) {
      console.log("Adding missing properties to cache...");
      await missingPropertiesCache.set(qid, missingProperties);
    }
  };

  const loadProperties = async (qid: string) => {
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
      queryDispatcher
        .queryProperties()
        .then((response) => {
          props = response.results.bindings;
          setProperties(props);
        })
        .then(async () => {
          console.log("Adding properties to cache...");
          await propertiesCache.set(qid, JSON.stringify(props));
        });

      queryDispatcher
        .queryMissingProperties()
        .then((response) => {
          missing_props = response.missing_properties;
          setMissingProperties(missing_props);
        })
        .then(async () => {
          console.log("Adding missing properties to cache...");
          await missingPropertiesCache.set(qid, JSON.stringify(missing_props));
        });
    }
  };

  const watchLocation = async () => {
    if (permissionStatus === "granted") {
      console.log("Tracking user location");
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 100000,
          distanceInterval: 80,
        },
        (newLocation) => {
          const distance = getDistance(
            {
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            },
            {
              latitude: newLocation.coords.latitude,
              longitude: newLocation.coords.longitude,
            }
          );
          console.log(distance);
          // if(distance > 1000){
          //     setUserLocation({ latitude: newLocation.coords.latitude, longitude: newLocation.coords.longitude });

          // }
        }
      );
    }
  };

  //TODO: specify if user data is to be cleared too
  const clearCache = async () => {
    await propertiesCache.clearAll();
    await missingPropertiesCache.clearAll();
    await startUpCache.clearAll();
  };

  const getData = async () => {
    try {
      const cachedData = await startUpCache.get("wiki");
      if (cachedData !== undefined) {
        console.log("Getting data from cache...");
        const data = JSON.parse(cachedData);
        setEntities(data);
        setLoadingData(false);
      } else {
        console.log("Querying wikidata...");
        const queryDispatcher = new SPARQLQueryDispatcher(
          userLocation,
          address[0].city,
          queryRange
        );
        queryDispatcher
          .query()
          .then((response) => {
            setEntities(response.results.bindings);
            setLoadingData(false);
            return response.results.bindings;
          })
          .then(async (response) => {
            await startUpCache.set("wiki", JSON.stringify(response));
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const refreshWiki = async () => {
    clearCache();
    setMarkers([]);
    setLoadingData(true);
    await getData();
  };

  const StartUp = async () => {
    const user_name = await startUpCache.get("user_name");
    const password = await startUpCache.get("password");
    if (user_name !== undefined && password !== undefined) {
      setUsername(user_name);
      setPassword(password);
    }
  };

  const cacheUserCredentials = async (username: string, password: string) => {
    startUpCache.set("user_name", username);
    startUpCache.set("password", password);
  };

  const setUserCredentials = async (username: string, password: string) => {
    setUsername(username);
    setPassword(password);
    cacheUserCredentials(username, password);
  };

  React.useEffect(() => {
    if (userLocation.latitude === undefined) getUserLocation();
    else getData();
  }, [userLocation]);

  React.useEffect(() => {
    StartUp();
  }, []);

  return (
    <WikiContext.Provider
      value={{
        region,
        entities,
        setUserLocation,
        selectedEntityQID,
        setSelectedEntityQID,
        clearCache,
        refreshWiki,
        selectedPropertyPID,
        setSelectedPropertyPID,
        username,
        password,
        queryRange,
        anonymous,
        setQueryRange,
        loadingData,
        setLoadingData,
        setMarkers,
        markers,
        loadProperties,
        properties,
        missingProperties,
        setUserCredentials,
        setAnonymous,
      }}
    >
      {children}
    </WikiContext.Provider>
  );
};
