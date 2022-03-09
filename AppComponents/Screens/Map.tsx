import * as React from 'react';
import MapView, { Marker, Region, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { WikiContext } from '../../Context/Context';

import { Mark } from '../CustomTypes'


export default function Map() {
  const { region, entities, setUserLocation } = React.useContext(WikiContext);

  const [markers, setMarkers] = React.useState([] as Mark[]);
  

  // const onRegionChanged = (region: Region) => {
  //   setRegion(region);
  // }
 

  const createMarkers = () => {
    const markers: Mark[] = [];
    console.log(entities.length);
    entities.forEach(entity =>{
      const marker: Mark = {
        coordinates: {
          latitude: +entity.lat.value,
          longitude: +entity.long.value,
        },
        title: entity.placeLabel.value,
        description: entity.placeDescription === undefined ? entity.placeLabel.value : entity.placeDescription.value,
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
      {region.latitude !== undefined && <MapView
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
            />)
        })}
      </MapView>
      }
    </>
  );
}