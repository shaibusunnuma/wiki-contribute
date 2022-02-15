import { LatLng } from 'react-native-maps';
import {LocationObject} from 'expo-location';


export type Entity = {
  location : Object;
  place: Object
  placeLabel: Object
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