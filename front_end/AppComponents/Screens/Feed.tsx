import React from 'react';
import { Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from "@rneui/base";
import { WikiContext } from '../../Context';

//@ts-ignore
const Item = ({ entity, navigation }) => (
  <ListItem 
    Component={TouchableOpacity}
    containerStyle={styles.item}
    onPress={() =>navigation.navigate('Properties',{entity: entity})
    }
    onLongPress={() => console.log("onLongPress()")}
  >
    <Text style={styles.title}>{entity.placeLabel.value}</Text>
  </ListItem>
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
    alignItems:'center',
    height: '100%',
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 1,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 18,
  },
})