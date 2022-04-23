//@ts-nocheck
import React from "react";
import { WikiContext } from "../../Context";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import Item from "../CommonComponents/MissingPropertyListItem";
import Modal from "react-native-modal";
import AddProperty from "../CommonComponents/AddPropertyForm";
import { Ionicons } from "@expo/vector-icons";

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

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

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
      <Modal isVisible={isModalVisible}>
        <View>
          <AddProperty />
          <View style={{ padding: 10, alignItems: "center" }}>
            <TouchableOpacity onPress={toggleModal}>
              <Ionicons name="close-circle-outline" size={50} color="#cccccc" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
