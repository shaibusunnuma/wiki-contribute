//@ts-nocheck
import * as React from 'react';
import MapView, { Marker, Region, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { WikiContext } from '../../Context';

import { Mark } from '../CustomTypes'

//@ts-ignore
export default function Map({navigation}) {
  const { region, entities, setUserLocation } = React.useContext(WikiContext);

  const [markers, setMarkers] = React.useState([] as Mark[]);
  

  // const onRegionChanged = (region: Region) => {
  //   setRegion(region);
  // }
 

  const createMarkers = () => {
    const markers: Mark[] = [];
    entities.forEach(entity =>{
      const marker: Mark = {
        coordinates: {
          latitude: +entity.lat.value,
          longitude: +entity.long.value,
        },
        title: entity.placeLabel.value,
        description: entity.placeDescription === undefined ? entity.placeLabel.value : entity.placeDescription.value,
        QID: entity.place.value.split('/')[4], //TODO : replace hardcoded index.
      };
      markers.push(marker);
    })
    setMarkers(markers);
  }

  React.useEffect(() => {
    if(entities.length !== 0){
      createMarkers();
    }
  },[entities]);

  return (
    <>  
      {region.latitude !== undefined && 
        <MapView
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          //onRegionChange={onRegionChanged}
          initialRegion={region}
        >
          {markers.map((marker, index) => {
              return (
              <Marker
                  key={index}
                  coordinate={marker.coordinates}
                  title={marker.title}
                  image={require('../../assets/marker_map_icon.png')}
                  description={marker.description}
                  onPress={() => navigation.navigate('Properties',{entity: marker})}
              />)
          })}
        </MapView>
      }
    </>
  );
}