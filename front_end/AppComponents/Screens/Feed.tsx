import React from 'react';
import { Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, View } from 'react-native';
import { ListItem } from "@rneui/base";
import { WikiContext } from '../../Context';

//@ts-ignore
const Item = ({ entity, navigation, setQID }) => (
  <ListItem 
    Component={TouchableOpacity}
    containerStyle={styles.itemContainer}
    onPress={() => {
      const placeValue = entity.place.value.split('/')
      setQID(placeValue[placeValue.length - 1]);
      navigation.navigate('Properties',{entity: entity})
    }}
    onLongPress={() => console.log("onLongPress()")}
  >
  <View style={styles.item}>
    <Text style={styles.title}>{entity.placeLabel.value}</Text>
  </View>
    
  </ListItem>
);


//@ts-ignore
export function Feed({navigation}) {
  const {entities, setQID} = React.useContext(WikiContext);

  //@ts-ignore
  const renderItem = ({ item }) => (
    <Item navigation={navigation} entity={item} setQID={setQID}/>
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
    alignItems:'center',
    height: '100%',
    width: '100%',
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 1,
    marginHorizontal: 5,
  },
  item: {
      width: '100%',
      margin: 0
  },
  title: {
    fontSize: 18,
  },
})