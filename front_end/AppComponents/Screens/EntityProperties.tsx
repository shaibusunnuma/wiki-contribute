//@ts-nocheck
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Button,
  Text,
  TouchableOpacity,
} from "react-native";
import { useMutation } from "@apollo/client";
import Modal from "react-native-modal";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Chase } from "react-native-animated-spinkit";
import Item from "../CommonComponents/PropertyListItem";
import AddProperty from "../CommonComponents/AddPropertyForm";
import EditProperty from "../CommonComponents/EditPropertyForm";
import { FeedStackParamList } from "../CustomTypes";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WikiContext } from "../../Context";
import { UPDATE_PROPERTY_MUTATION } from "../../GraphQL/Mutations";

type EntityListProps = NativeStackScreenProps<FeedStackParamList, "Properties">;

export function EntityProperties({ route, navigation }: EntityListProps) {
  const {
    properties,
    loadProperties,
    username,
    password,
    selectedEntityQID,
    selectedPropertyPID,
  } = React.useContext(WikiContext);
  const { entity } = route.params;
  const [modalType, setModalType] = React.useState("");
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [oldValue, setOldValue] = React.useState("");
  const [newValue, setNewValue] = React.useState("");
  const [updateProperty, { error }] = useMutation(UPDATE_PROPERTY_MUTATION);

  const toggleModal = () => {
    setModalType("add");
    setIsModalVisible(!isModalVisible);
  };

  const editProperty = () => {
    try {
      updateProperty({
        variables: {
          username: username,
          password: password,
          id: selectedEntityQID,
          property: selectedPropertyPID,
          oldValue: oldValue,
          newValue: newValue,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
  const getQID = () => {
    if (entity.QID !== undefined) {
      return entity.QID;
    }
    return entity.place.value.split("/")[4];
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={toggleModal}>
          {/* @ts-ignore */}
          <MaterialCommunityIcons name="plus" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, []);

  React.useEffect(() => {
    loadProperties(getQID());
  }, []);

  //@ts-ignore
  const renderItem = ({ item }) => (
    <Item
      property={item}
      setModalType={setModalType}
      setIsModalVisible={setIsModalVisible}
    />
  );

  return (
    <SafeAreaView style={styles.mainView}>
      <View style={{ width: "100%", backgroundColor: "white" }}>
        <Button
          title="Missing properties"
          onPress={() => {
            navigation.push("missingProperties");
          }}
        />
      </View>

      {properties.length !== 0 ? (
        <FlatList
          data={properties}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ padding: 10 }}>
            <Chase size={48} color="#006699" />
          </View>
          <Text>Loading Properties...</Text>
        </View>
      )}
      <Modal isVisible={isModalVisible}>
        <View>
          {modalType === "add" ? (
            <AddProperty />
          ) : (
            <EditProperty
              editProperty={editProperty}
              oldValue={oldValue}
              setOldValue={setOldValue}
              newValue={newValue}
              setNewValue={setNewValue}
            />
          )}
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
