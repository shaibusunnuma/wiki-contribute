import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  Text,
  View,
} from "react-native";
import Item from "../CommonComponents/EntityListItem";
import { WikiContext } from "../../Context";
import { FeedStackParamList, Entity } from "../CustomTypes";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import Search from "../CommonComponents/Search";
import { Chase } from "react-native-animated-spinkit";

interface FeedProps {
  navigation: NativeStackNavigationProp<
    FeedStackParamList,
    "Properties",
    undefined
  >;
  route: RouteProp<FeedStackParamList, "Properties">;
}

export default function ({ navigation }: FeedProps) {
  const { entities, setQID, refreshWiki, loadingData } =
    React.useContext(WikiContext);
  const [refresh, setRefresh] = React.useState(false);
  const [filteredData, setFilteredData] = React.useState(entities);
  const [search, setSearch] = React.useState("");

  const renderItem = ({ item }: ListRenderItemInfo<Entity>) => (
    <Item navigation={navigation} entity={item} setQID={setQID} />
  );

  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData = entities.filter(function (item) {
        const itemData = item.placeLabel.value
          ? item.placeLabel.value.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(entities);
      setSearch(text);
    }
  };
  React.useEffect(() => {
    setFilteredData(entities);
  }, [entities]);

  return (
    <>
      <SafeAreaView style={styles.mainView}>
        <Search searchFunction={searchFilterFunction} />
        {!loadingData ? (
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text>No items</Text>
                <Text>
                  Increase Query Range in Settings to query wider region
                </Text>
              </View>
            )}
            initialNumToRender={20}
            refreshing={false}
            onRefresh={() => {
              setRefresh(true);
              refreshWiki();
            }}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View style={{ padding: 10 }}>
              <Chase size={48} color="#006699" />
            </View>
            <Text>Loading WikiData...</Text>
          </View>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
