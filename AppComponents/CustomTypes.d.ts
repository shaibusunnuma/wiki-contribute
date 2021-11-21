import { LatLng } from 'react-native-maps';
import {LocationObject} from 'expo-location';


export type Entity = {
  a : Object;
  aLabel: {value: string};
  lat: {value: number};
  long: {value: number};
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