import React from "react";
import { WikiContext } from "../../Context";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Item from "../CommonComponents/MissingPropertyListItem";
import { useMutation } from "@apollo/client";
import Modal from "react-native-modal";
import AddMissingProperty from "../CommonComponents/AddMissingPropertyForm";
import { Ionicons } from "@expo/vector-icons";
import { CREATE_PROPERTY_MUTATION } from "../../GraphQL/Mutations";

export default function MissingProperties() {
  const {
    missingProperties,
    username,
    password,
    selectedEntityQID,
    selectedPropertyPID,
    anonymous,
  } = React.useContext(WikiContext);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [addProperty, { error }] = useMutation(CREATE_PROPERTY_MUTATION);

  const renderItem = ({ item }) => (
    <Item item={item} setIsModalVisible={setIsModalVisible} />
  );

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const createProperty = () => {
    addProperty({
      variables: {
        username: username,
        password: password,
        anonymous: anonymous,
        id: selectedEntityQID,
        property: selectedPropertyPID,
        value: value,
      },
    });

    if (error) {
      console.log(error);
    }
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
      />
      <Modal isVisible={isModalVisible}>
        <View>
          <AddMissingProperty
            createProperty={createProperty}
            value={value}
            setValue={setValue}
          />
          <View style={{ padding: 10, alignItems: "center" }}>
            <TouchableOpacity onPress={toggleModal}>
              {/* @ts-ignore */}
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
