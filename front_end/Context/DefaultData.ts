import { WikiContextState, Mark } from "../AppComponents/CustomTypes";
import { Region } from "react-native-maps";


const contextDefaultData: WikiContextState = {
    region: {} as Region,
    entities: [],
    username: "",
    password: "",
    queryRange: "",
    loadingData: false,
    anonymous: false,
    properties: [],
    missingProperties: [],
    login: false,
    trackLocation: false,
    selectedEntityQID: "",
    selectedPropertyPID: "",
    markers: [] as Mark[],
    propertySuggestionsList: [],
    startUpCacheSize: 0,
    propertiesCacheSize: 0,
    missingPropertiesCacheSize: 0,
    reloadProperties: () => { },
    setPropertySuggestionsList: () => { },
    setSelectedEntityQID: () => { },
    setUserLocation: () => { },
    loadProperties: (qid: string) => { },
    setSelectedPropertyPID: () => { },
    clearCache: () => { },
    refreshWiki: () => { },
    setQueryRange: () => { },
    setTrackLocation: () => { },
    setUserCredentials: (user_name: string, password: string) => { },
    setLoadingData: () => { },
    setMarkers: () => { },
    setAnonymous: () => { },
    setLogin: () => { }
};

export default contextDefaultData;