import React from 'react';
import { Text, View, SafeAreaView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import {Entity} from '../CustomTypes'
import { WikiContext } from '../../Context/Context';

//@ts-ignore
const Item = ({ entity, navigation }) => (
  <TouchableOpacity 
    onPress={
      () =>navigation.navigate('Properties',
      {entity: entity})
    } 
    style={styles.item}>
    <Text style={styles.title}>{entity.placeLabel.value}</Text>
  </TouchableOpacity>
);


//@ts-ignore
export function Feed({navigation}) {
  const {entities} = React.useContext(WikiContext);

  //@ts-ignore
  const renderItem = ({ item }) => (
    <Item navigation={navigation} entity={item} />
  );

  return (
    <SafeAreaView style={styles.mainView}>
      <FlatList
        data={entities}
        renderItem = {renderItem}
        keyExtractor = {(item, index) => index.toString()}
        />
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
    marginVertical: 1,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 18,
  },
})