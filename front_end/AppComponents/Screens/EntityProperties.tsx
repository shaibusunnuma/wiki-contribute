import React from 'react';
import Modal from 'react-native-modal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView, StyleSheet, FlatList, View, Button, TouchableOpacity} from 'react-native';
import {SPARQLQueryDispatcher} from '../API/PropertiesQueryDispatcher';
import Item from './PropertyItem';
import AddProperty from './AddPropertyForm';

//@ts-ignore
export function EntityProperties({route, navigation}) {
  const {entity} = route.params;
  const [properties, setProperties] = React.useState([]);
  const [recoin, setRecoin] = React.useState([])
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };


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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Statements',
      headerRight: () => (
              <TouchableOpacity onPress={toggleModal}>
                <MaterialCommunityIcons name="plus" size={24} color="black" />
              </TouchableOpacity>
            )
    })
  }, [])

  React.useEffect(() => {
    loadProperties();
  },[]);
  
  //@ts-ignore
  const renderItem = ({ item }) => (
    <Item  property={item} />
  );

  return (
    <SafeAreaView style={styles.mainView}>
      {properties.length !== 0 && 
        <FlatList
          data={properties}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      }
      <Modal
        isVisible={isModalVisible}>
        <View>
          <AddProperty />
          <View>
            <Button title="Hide modal" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems:'center'
  }
})

