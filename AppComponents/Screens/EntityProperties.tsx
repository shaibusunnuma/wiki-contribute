import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList} from 'react-native';
import {SPARQLQueryDispatcher} from '../API/PropertiesQueryDispatcher';

//@ts-ignore
const Item = ({ property }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{property.wdLabel.value} : {property.ps_Label.value}</Text>
  </View>
);

//@ts-ignore
export function EntityProperties({route}) {
  const {entity} = route.params;
  const [properties, setProperties] = React.useState([]);
  const [recoin, setRecoin] = React.useState([])


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
    })
    // queryDispatcher.queryRecoinProperties()
    // .then(response => {
    //   console.log(response)
    // })
  }

  React.useEffect(() => {
    loadProperties();
  },[]);
  
  //@ts-ignore
  const renderItem = ({ item }) => (
    <Item  property={item} />
  );

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {properties.length !== 0 && 
        <FlatList
          data={properties}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      }
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
})

