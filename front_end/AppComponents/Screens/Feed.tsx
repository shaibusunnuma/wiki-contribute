import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, ListRenderItemInfo } from 'react-native';
import Item from '../CommonComponents/EntityListItem';
import { WikiContext } from '../../Context';
import { RootStackParamList, Entity} from '../CustomTypes';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

interface FeedProps {
    navigation: NativeStackNavigationProp<RootStackParamList, "Properties", undefined>;
    route: RouteProp<RootStackParamList, "Properties">;

}

export function Feed({navigation, route}: FeedProps) {
  const {entities, setQID} = React.useContext(WikiContext);

  const renderItem = ({ item }: ListRenderItemInfo<Entity>) => (
    <Item route={route} navigation={navigation} entity={item} setQID={setQID}/>
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