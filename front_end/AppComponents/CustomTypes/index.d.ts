import { LatLng, Region } from 'react-native-maps';
import { LocationObject } from 'expo-location';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

export type FeedStackParamList = {
  Feed: undefined;
  Properties: { entity: Entity | Mark };
  MissingProperties: undefined;
};

export type SettingsStackParamList = {
  Settings: undefined;
  Profile: undefined;
}

export interface Entity {
  lat: { value: number }
  long: { value: number }
  place: { value: string }
  placeLabel: { value: string }
  placeDescription: { value: string }
}

type PropertySuggestion = {
  id: string;
  title: string;
}

interface Editvariables {
  username: string;
  password: string;
  id: string;
  anonymous: boolean;
  property: string;
  oldValue: string;
  newValue: string;
};

interface Addvariables {
  username: string;
  password: string;
  id: string;
  anonymous: boolean;
  property: string;
  value: string;
};



type WikiContextState = {
  region: Region;
  entities: Entity[];
  anonymous: boolean;
  trackLocation: boolean;
  properties: any[];
  missingProperties: any[];
  login: boolean;
  selectedPropertyPID: string;
  username: string;
  password: string;
  queryRange: string;
  loadingData: boolean;
  entitiesCacheSize: number;
  propertiesCacheSize: number;
  markers: Mark[];
  selectedEntityQID: string;
  propertySuggestionsList: any[];
  showSnackBar: boolean;
  snackBarMessage: string;
  setSnackBarMessage: React.Dispatch<React.SetStateAction<string, string>>;
  setShowSnackBar: React.Dispatch<React.SetStateAction<boolean, boolean>>;
  reloadProperties: () => void;
  setPropertySuggestionsList: React.Dispatch<React.SetStateAction<{
    id: string;
    title: string;
  }[]>>;
  WikiUpdateCachingHandler: (updateInstance: string, updateData: Object) => void
  setUserLocation: React.Dispatch<React.SetStateAction<LatLng, LatLng>>
  setSelectedEntityQID: React.Dispatch<React.SetStateAction<string, string>>;
  loadProperties: (qid: string) => void;
  setSelectedPropertyPID: React.Dispatch<React.SetStateAction<string, string>>;
  clearCache: (cacheInstance: string) => void;
  refreshWiki: () => void;
  SetQueryRange: (range: string) => void;
  setUserCredentials: (user_name: string, password: string) => void;
  setLoadingData: React.Dispatch<React.SetStateAction<boolean, boolean>>;
  setTrackLocation: React.Dispatch<React.SetStateAction<boolean, boolean>>;
  setMarkers: React.Dispatch<React.SetStateAction<Mark[]>>;
  setAnonymous: React.Dispatch<React.SetStateAction<boolean, boolean>>;
  setLogin: React.Dispatch<React.SetStateAction<boolean, boolean>>;
}

export type Mark = {
  coordinates: LatLng;
  title: string;
  description: string;
  QID: string;
}