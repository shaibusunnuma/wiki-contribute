import * as React from 'react';
import MapView, { Marker, Region, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { WikiContext } from '../../Context/Context';

import { Mark } from '../CustomTypes'

// const defaultRegion: Region = {
//     latitude: 24.4849,
//     longitude: 54.3541,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421
// }



export default function Map() {
    const { entities, setUserLocation } = React.useContext(WikiContext);

    const [region, setRegion] = React.useState({} as Region);
    const [markers, setMarkers] = React.useState([] as Mark[]);
    const [permissionStatus, setPermissionStatus] = React.useState('');
    

    // const onRegionChanged = (region: Region) => {
    //   setRegion(region);
    // }

    const getUserLocation = async() => {
      const { status } = await  Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setPermissionStatus('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      } as Region);
      setUserLocation(location.coords);
    }

    // const watch_location = async () => {  
    //   if (permissionStatus === 'granted') {     
    //     let location = await Location.watchPositionAsync({
    //         accuracy:Location.Accuracy.High,
    //         timeInterval: 10000,
    //         distanceInterval: 80,
    //       },
    //       (newLocation)=>console.log(newLocation.coords)
    //       )
    //     }
    // }
    const getCoords = (coords: string) => {
      const str = coords.split("(")[1];
      const coordinates = str.substring(0, str.length - 1).split(" ");
      return coordinates;
    }

    const createMarkers = () => {
      const markers: Mark[] = [];
      console.log(entities.length);
      entities.forEach(entity =>{
        const coords = getCoords(entity.location.value);
        const marker: Mark = {
          coordinates: {
            latitude: +coords[1],
            longitude: +coords[0],
          },
          title: entity.placeLabel.value,
          description: entity.placeLabel.value,
        };
        markers.push(marker);
     })
     console.log(markers);
      setMarkers(markers);
    }

    React.useEffect(() => {
      if(entities.length !== 0){
        createMarkers();
      }
    },[entities]);

    React.useEffect(() => {
      getUserLocation();
    },[])

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