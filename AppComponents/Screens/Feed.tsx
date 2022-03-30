import React from 'react';
import { Text, View, SafeAreaView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import {Entity} from '../CustomTypes'
import { WikiContext } from '../../Context/Context';

const Item = ({ title }) => (
  <TouchableOpacity onPress={() =>console.log(title)}style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

export function Feed() {
  const {entities} = React.useContext(WikiContext);

  const renderItem = ({ item }) => (
    <Item title={item.placeLabel.value} />
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
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
})