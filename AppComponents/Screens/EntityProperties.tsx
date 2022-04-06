import React from 'react';
import { Text, SafeAreaView} from 'react-native';
import {SPARQLQueryDispatcher} from '../API/PropertiesQueryDispatcher';


//@ts-ignore
export function EntityProperties({route}) {
  const {entity} = route.params;
  const [properties, setProperties] = React.useState([]);
  const [recoin, setRecoin] = React.useState([])

  let props = [];

  const getQID = () => {
    if(entity.QID !== undefined) {return entity.QID}
    return entity.place.value.split('/')[4]
  }

  const loadProperties = async() => {
    console.log('Querying entity properties...')
    const queryDispatcher = new SPARQLQueryDispatcher(getQID());
    queryDispatcher.query()
    .then( response => {
        const props = response.results.bindings;
        setProperties(props)
        console.log(response)
    })
    // queryDispatcher.queryRecoinProperties()
    // .then(response => {
    //   console.log(response)
    // })
  }

  React.useEffect(() => {
    loadProperties();
  },[]);

  console.log(getQID());
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Details</Text>
    </SafeAreaView>
  );
}

