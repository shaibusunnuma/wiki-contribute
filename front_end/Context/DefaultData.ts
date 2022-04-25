import { WikiContextState, Mark } from "../AppComponents/CustomTypes";
import { Region } from "react-native-maps";


const contextDefaultData: WikiContextState = {
    region: {} as Region,
    entities: [],
    username: "",
    password: "",
    queryRange: "",
    loadingData: false,
    selectedEntityQID: "",
    selectedPropertyPID: "",
    properties: [],
    missingProperties: [],
    markers: [] as Mark[],
    setUserLocation: () => { },
    setSelectedEntityQID: () => { },
    setSelectedPropertyPID: () => { },
    clearCache: () => { },
    refreshWiki: () => { },
    setQueryRange: () => { },
    setUserCredentials: (user_name: string, password: string) => { },
    setLoadingData: () => { },
    setMarkers: () => { },
    loadProperties: (qid: string) => { },
};

export default contextDefaultData;