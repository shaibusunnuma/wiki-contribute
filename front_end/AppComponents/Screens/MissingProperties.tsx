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
import CameraView from "../CommonComponents/Camera";
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
  const [isError, setIsError] = React.useState("no error");
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [startCamera, setStartCamera] = React.useState(false);
  const [addProperty, { error }] = useMutation(CREATE_PROPERTY_MUTATION);

  const renderItem = ({ item }) => (
    <Item
      item={item}
      startCamera={__startCamera}
      setIsModalVisible={setIsModalVisible}
    />
  );

  const __startCamera = () => {
    setStartCamera(true);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    setIsError("no error");
    setSuccess(false);
    setValue("");
  };

  const createProperty = async () => {
    setLoading(true);
    try {
      await addProperty({
        variables: {
          username: username,
          password: password,
          anonymous: anonymous,
          id: selectedEntityQID,
          property: selectedPropertyPID,
          value: value,
        },
      }).then(() => {
        setSuccess(true);
        setLoading(false);
      });
    } catch (err) {
      setLoading(false);
      setIsError(err.message);
    }
  };

  if (startCamera) return <CameraView setStartCamera={setStartCamera} />;

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
            loading={loading}
            toggleModal={toggleModal}
            success={success}
            isError={isError}
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
