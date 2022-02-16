import { LatLng } from 'react-native-maps';
import {LocationObject} from 'expo-location';


export type Entity = {
  location : {value: string};
  place: {value: string}
  placeLabel: {value: string}
}

type WikiContextState = {
    entities : Entity[];
    setUserLocation: React.Dispatch<React.SetStateAction<LocationObject['coords']>>
}

export type Mark = {
    coordinates: LatLng;
    title: string;
    description: string;
}