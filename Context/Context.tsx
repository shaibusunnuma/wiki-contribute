import React, { PropsWithChildren } from 'react';
import {SPARQLQueryDispatcher} from '../AppComponents/API/QueryDispatcher';
import {Entity} from '../AppComponents/CustomTypes';
import {WikiContextState} from '../AppComponents/CustomTypes';

const endpointUrl = 'https://query.wikidata.org/sparql';

const sparqlQuery = `SELECT ?a ?aLabel ?lat ?long WHERE {
  ?a wdt:P131+ wd:Q90 .  # administrative territorial entity = Paris
  ?a p:P625 ?statement . # coordinate-location statement
  ?statement psv:P625 ?coordinate_node .
  ?coordinate_node wikibase:geoLatitude ?lat .
  ?coordinate_node wikibase:geoLongitude ?long .

  FILTER (ABS(?lat - 48.8738) < 0.01)
  FILTER (ABS(?long - 2.2950) < 0.01)

  SERVICE wikibase:label {
    bd:serviceParam wikibase:language "en" .
  }
} ORDER BY DESC(?lat)`;



const contextDefaultData: WikiContextState = {
    entities: [],
}

interface Props {
    children: JSX.Element
}

export const WikiContext = React.createContext<WikiContextState>(contextDefaultData);

export const WikiProvider = ({children}: React.PropsWithChildren<Props>) =>{
    const [entities, setEntities] = React.useState([] as Entity[]);

    const getData = () => {
        const queryDispatcher = new SPARQLQueryDispatcher( endpointUrl );
        queryDispatcher.query( sparqlQuery )
        .then( response => setEntities(response.results.bindings) );
    }

    React.useEffect(() => {
        getData();
    },[])

    // React.useEffect(() => {
    //     console.log(entities);
    // },[])

    return (
        <WikiContext.Provider value={{entities}}>{children}</WikiContext.Provider>
    )
}


