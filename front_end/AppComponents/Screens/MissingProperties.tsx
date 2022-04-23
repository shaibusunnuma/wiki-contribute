import React from "react";
import { WikiContext } from "../../Context";
import { SafeAreaView, StyleSheet, FlatList, Text, View } from "react-native";
import Item from "../CommonComponents/MissingPropertyListItem";

export default function MissingProperties() {
  const { missingProperties } = React.useContext(WikiContext);
  const [modalType, setModalType] = React.useState("");
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const renderItem = ({ item }) => (
    <Item
      item={item}
      setModalType={setModalType}
      setIsModalVisible={setIsModalVisible}
    />
  );

  return (
    <SafeAreaView style={styles.mainView}>
      <FlatList
        data={missingProperties}
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
            <Text>No missing properties</Text>
          </View>
        )}
        initialNumToRender={20}
        //   refreshing={false}
        //   onRefresh={() => {
        //     refreshWiki();
        //   }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
