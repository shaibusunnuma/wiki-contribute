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
import CameraView from "../CommonComponents/Camera";
import { FeedStackParamList } from "../CustomTypes";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WikiContext } from "../../Context";
import { UPDATE_PROPERTY_MUTATION } from "../../GraphQL/Mutations";
import { CREATE_PROPERTY_MUTATION } from "../../GraphQL/Mutations";

type EntityListProps = NativeStackScreenProps<FeedStackParamList, "Properties">;

export function EntityProperties({ route, navigation }: EntityListProps) {
  const {
    properties,
    loadProperties,
    username,
    password,
    selectedPropertyPID,
    selectedEntityQID,
    anonymous,
  } = React.useContext(WikiContext);
  const { entity } = route.params;
  const [modalType, setModalType] = React.useState("");
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [oldValue, setOldValue] = React.useState("");
  const [value, setValue] = React.useState("");
  const [isError, setIsError] = React.useState("no error");
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [propertyPID, setPropertyPID] = React.useState("");
  const [updateProperty] = useMutation(UPDATE_PROPERTY_MUTATION);
  const [addProperty] = useMutation(CREATE_PROPERTY_MUTATION);
  const [title, setTitle] = React.useState("");
  const [startCamera, setStartCamera] = React.useState(false);

  const toggleModal = () => {
    setModalType("add");
    setIsModalVisible(!isModalVisible);
    setIsError("no error");
    setSuccess(false);
    setValue("");
  };

  const createProperty = async () => {
    setLoading(true);
    try {
      if (!value || !propertyPID) {
        throw new Error("Enter value");
      }
      await addProperty({
        variables: {
          username: username,
          password: password,
          anonymous: anonymous,
          id: selectedEntityQID,
          property: propertyPID,
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

  const editProperty = async () => {
    setLoading(true);
    try {
      if (!value) {
        throw new Error("Enter inputs");
      }
      await updateProperty({
        variables: {
          username: username,
          password: password,
          id: selectedEntityQID,
          anonymous: anonymous,
          property: selectedPropertyPID,
          oldValue: oldValue, //get qid of old value
          newValue: value,
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
  const getQID = () => {
    if (entity.QID !== undefined) {
      const t =
        entity.title.length > 20 ? entity.title.slice(0, 20) : entity.title;
      setTitle(t);
      return entity.QID;
    } //map returns entity.QID
    let t: string = entity.placeLabel.value;
    t = t.length > 20 ? t.slice(0, 20) + "..." : t;
    setTitle(t);
    return entity.place.value.split("/")[4];
  };

  const __startCamera = () => {
    setStartCamera(true);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={toggleModal}>
          <MaterialCommunityIcons name="plus" size={24} color="black" />
        </TouchableOpacity>
      ),
      title: title,
    });
  }, [title]);

  React.useEffect(() => {
    loadProperties(getQID());
  }, [entity]);

  const renderItem = ({ item }) => (
    <Item
      property={item}
      setModalType={setModalType}
      setIsModalVisible={setIsModalVisible}
      setOldValue={setOldValue}
      setValue={setValue}
      startCamera={__startCamera}
    />
  );

  if (startCamera) return <CameraView setStartCamera={setStartCamera} />;

  return (
    <SafeAreaView style={styles.mainView}>
      <View
        style={{
          width: "100%",
          backgroundColor: "white",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <Button
          title="Missing properties"
          onPress={() => {
            navigation.push("MissingProperties");
          }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="chevron-right"
            size={30}
            color="black"
          />
        </View>
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
            <AddProperty
              loading={loading}
              toggleModal={toggleModal}
              success={success}
              isError={isError}
              createProperty={createProperty}
              value={value}
              setValue={setValue}
              setPropertyID={setPropertyPID}
            />
          ) : (
            <EditProperty
              loading={loading}
              toggleModal={toggleModal}
              success={success}
              isError={isError}
              editProperty={editProperty}
              newValue={value}
              setNewValue={setValue}
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
