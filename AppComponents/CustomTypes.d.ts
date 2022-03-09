import { LatLng, Region } from 'react-native-maps';
import {LocationObject} from 'expo-location';


export interface Entity {
  lat : {value: number}
  long : {value: number}
  place: {value: string}
  placeLabel: {value: string}
  placeDescription: {value: string}
}

type WikiContextState = {
    region: Region;
    entities : Entity[];
    setUserLocation: React.Dispatch<React.SetStateAction<LatLng, LatLng>>
}

export type Mark = {
    coordinates: LatLng;
    title: string;
    description: string;
}