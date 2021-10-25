import * as React from 'react';
import { Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, LatLng, Region } from 'react-native-maps';



type Mark = {
    coordinates: LatLng;
    title: string;
    description: string;
}

var markers: Mark[] = [
  {
    coordinates: {latitude: 37.78825,longitude: -122.4323,},
    title: 'Foo Place',
    description: '1234 Foo Drive',
  },
  {
    coordinates: {latitude: 37.78825,longitude: -122.4322,},
    title: 'Foo Place',
    description: '1234 Foo Drive',
  },
  {
    coordinates: {latitude: 37.78825,longitude: -122.4324,},
    title: 'Foo Place',
    description: '1234 Foo Drive',
  },
];

const defaultRegion: Region = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
}

export default function Map() {
    const [region, setRegion] = React.useState(defaultRegion)
    return (
            <MapView
            style={{ flex: 1 }}
            provider={PROVIDER_GOOGLE}
            //showsUserLocation
            region={region}
        >
            {markers.map((marker, index) => {
                return (
                <Marker
                    key={index}
                    coordinate={marker.coordinates}
                    title={marker.title}
                    image={require('../../assets/marker_map_icon.png')}
                    description={marker.description}
                />)
            })}
        </MapView>
    );
}