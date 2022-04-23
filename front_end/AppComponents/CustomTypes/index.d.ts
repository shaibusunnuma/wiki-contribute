import { LatLng, Region } from 'react-native-maps';
import { LocationObject } from 'expo-location';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type FeedStackParamList = {
  Feed: undefined;
  Properties: { entity: Entity };
};

export interface Entity {
  lat: { value: number }
  long: { value: number }
  place: { value: string }
  placeLabel: { value: string }
  placeDescription: { value: string }
}

type WikiContextState = {
  region: Region;
  entities: Entity[];
  setUserLocation: React.Dispatch<React.SetStateAction<LatLng, LatLng>>
  QID: string;
  setQID: React.Dispatch<React.SetStateAction<string, string>>;
  clearCache: () => void;
  refreshWiki: () => void;
  setQueryRange: React.Dispatch<React.SetStateAction<string, string>>;
  setLoadingData: React.Dispatch<React.SetStateAction<boolean, boolean>>;
  setMarkers: React.Dispatch<React.SetStateAction<Mark[]>>
  username: string;
  password: string;
  queryRange: string;
  loadingData: boolean;
  markers: Mark[];
  loadProperties: (qid: string) => void;
  properties: any[];
  missingProperties: any[];
}

export type Mark = {
  coordinates: LatLng;
  title: string;
  description: string;
  QID: string;
}