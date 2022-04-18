import { LatLng, Region } from 'react-native-maps';
import {LocationObject} from 'expo-location';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Properties: { entity: Entity };
};



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
    QID: string;
    setQID: React.Dispatch<React.SetStateAction<string, string>>
}

export type Mark = {
    coordinates: LatLng;
    title: string;
    description: string;
    QID: string;
}