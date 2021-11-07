import * as React from 'react';
import { Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, LatLng, Region } from 'react-native-maps';
import { WikiContext } from '../../Context/Context';

import { Mark } from '../CustomTypes'


// var markers: Mark[] = [
//   {
//     coordinates: {latitude: 37.78825,longitude: -122.4323,},
//     title: 'Foo Place',
//     description: '1234 Foo Drive',
//   },
//   {
//     coordinates: {latitude: 37.78825,longitude: -122.4322,},
//     title: 'Foo Place',
//     description: '1234 Foo Drive',
//   },
//   {
//     coordinates: {latitude: 37.78825,longitude: -122.4322,},
//     title: 'Foo Place',
//     description: '1234 Foo Drive',
//   },
// ];

const defaultRegion: Region = {
    latitude: 24.4849,
    longitude: 54.3541,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
}



export default function Map() {
    const [region, setRegion] = React.useState(defaultRegion);
    const [markers, setMarkers] = React.useState([] as Mark[]);
    const {entities} = React.useContext(WikiContext);

    const onRegionChanged = (region: Region) => {
      setRegion(region);
    }

    const createMarkers = () => {
      if(entities.length !== 0){
        const markers: Mark[] = [];
        for(let i = 0; i < 30; i++) {
          const m = entities[i];
          const marker: Mark = {
            coordinates: {
              latitude: m.lat.value * 1,
              longitude: m.long.value * 1,
            },
            title: m.aLabel.value,
            description: m.aLabel.value,
          };
          markers.push(marker);
        }
        setMarkers(markers);
      }
    }

    React.useEffect(() => {
      createMarkers();
    },[entities]);

    React.useEffect(() => {
      console.log(markers);
    })

    return (
            <MapView
              style={{ flex: 1 }}
              //provider={PROVIDER_GOOGLE}
              showsUserLocation
              //onRegionChange={onRegionChanged}
              initialRegion={defaultRegion}
            >
            {markers.map((marker, index) => {
                console.log(marker);
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