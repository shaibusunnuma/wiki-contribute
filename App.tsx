import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Search from './AppComponents/Search';
import {MyTabs} from './AppComponents/Navigation/navigation';
// import {SPARQLQueryDispatcher} from './AppComponents/API/QueryDispatcher';
// import {Entity} from './AppComponents/CustomTypes';
import {WikiProvider} from './Context/Context';


// const endpointUrl = 'https://query.wikidata.org/sparql';

// const sparqlQuery = `SELECT ?a ?aLabel ?lat ?long WHERE {
//   ?a wdt:P131+ wd:Q90 .  # administrative territorial entity = Paris
//   ?a p:P625 ?statement . # coordinate-location statement
//   ?statement psv:P625 ?coordinate_node .
//   ?coordinate_node wikibase:geoLatitude ?lat .
//   ?coordinate_node wikibase:geoLongitude ?long .

//   FILTER (ABS(?lat - 48.8738) < 0.01)
//   FILTER (ABS(?long - 2.2950) < 0.01)

//   SERVICE wikibase:label {
//     bd:serviceParam wikibase:language "en" .
//   }
// } ORDER BY DESC(?lat)`;

export default function App() {
  // const [entities, setEntities] = React.useState([] as Entity[])

  // const getData = () => {
  //   const queryDispatcher = new SPARQLQueryDispatcher( endpointUrl );
  //   queryDispatcher.query( sparqlQuery )
  //   .then( response => setEntities(response.results.bindings) );
  // }


  
  // React.useEffect(() => {
  //   getData();
  // },[])

  // React.useEffect(() => {
  //   console.log(entities);
  // },[])

  return (
    <>
      <Search />
      <NavigationContainer>
        <WikiProvider>
          <MyTabs />
        </WikiProvider>
      </NavigationContainer>
    </>
  );
}