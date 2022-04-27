import { WikiContextState, Mark } from "../AppComponents/CustomTypes";
import { Region } from "react-native-maps";


const contextDefaultData: WikiContextState = {
    region: {} as Region,
    entities: [],
    setUserLocation: () => { },
    selectedEntityQID: "",
    setSelectedEntityQID: () => { },
    selectedPropertyPID: "",
    setSelectedPropertyPID: () => { },
    clearCache: () => { },
    refreshWiki: () => { },
    setQueryRange: () => { },
    setUserCredentials: (user_name: string, password: string) => { },
    username: "",
    password: "",
    queryRange: "",
    loadingData: false,
    anonymous: false,
    setLoadingData: () => { },
    setMarkers: () => { },
    setAnonymous: () => { },
    markers: [] as Mark[],
    loadProperties: (qid: string) => { },
    properties: [],
    missingProperties: [],
};

export default contextDefaultData;