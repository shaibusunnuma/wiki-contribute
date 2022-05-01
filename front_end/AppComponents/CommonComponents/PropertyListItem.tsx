import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { ListItem, Card } from "@rneui/base";
import openMap from "react-native-open-maps";
import { WikiContext } from "../../Context";

export default ({
  property,
  setModalType,
  setIsModalVisible,
  setOldValue,
  setValue,
  startCamera,
}) => {
  const { setSelectedPropertyPID } = React.useContext(WikiContext);
  let Value: JSX.Element;
  if (property.wdLabel.value === "image") {
    Value = <ImageValue value={property.ps_Label.value} />;
  } else if (property.wdLabel.value === "coordinate location") {
    let value = property.ps_Label.value;
    value = value.substring(0, value.length - 1);
    const coord = value.split("(")[1].split(" ");
    Value = <MapValue value={coord} />;
  } else if (property.wdLabel.value === "official website") {
    Value = <LinkValue value={property.ps_Label.value} />;
  } else {
    Value = <TextValue value={property.ps_Label.value} />;
  }

  const __editHandler = () => {
    if (property.wdLabel.value === "image") startCamera();
    else toggleModal();
  };
  const toggleModal = () => {
    setModalType("edit");
    setSelectedPropertyPID(getPID());
    setIsModalVisible(true);
    setOldValue(property.ps_Label.value);
    setValue(property.ps_Label.value);
  };

  const getPID = () => {
    return property.wd.value.split("/")[4];
  };
  return (
    <ListItem containerStyle={styles.itemContainer}>
      <Card containerStyle={styles.card}>
        <View style={styles.top}>
          <Text style={styles.property}>{property.wdLabel.value}</Text>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={__editHandler}
          >
            {/* @ts-ignore */}
            <MaterialCommunityIcons
              name={property.wdLabel.value === "image" ? "camera" : "pencil"}
              size={18}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <Card.Divider />
        {Value}
      </Card>
    </ListItem>
  );
};
//@ts-ignore
const TextValue = ({ value }) => <Text style={styles.value}>{value}</Text>;

//@ts-ignore
const ImageValue = ({ value }) => (
  <Card.Image
    style={{ padding: 0 }}
    source={{
      uri: value,
    }}
  />
);
const MapValue = ({ value }) => (
  <View style={styles.top}>
    <Text>{`Lat: ${value[0]}   Long: ${value[1]}`}</Text>
    <TouchableOpacity
      style={styles.iconContainer}
      onPress={() => {
        openMap({ latitude: +value[1], longitude: +value[0] });
        console.log(+value[1]);
      }}
    >
      {/* @ts-ignore */}
      <Ionicons name="open-outline" size={15} color="black" />
    </TouchableOpacity>
  </View>
);

const LinkValue = ({ value }) => (
  <View style={styles.top}>
    <Text>{value}</Text>
    <TouchableOpacity
      style={styles.iconContainer}
      onPress={async () => {
        const supported = await Linking.canOpenURL(value);
        if (supported) {
          await Linking.openURL(value);
        }
      }}
    >
      {/* @ts-ignore */}
      <Ionicons name="open-outline" size={15} color="black" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  itemContainer: {
    padding: 0,
    marginVertical: 0,
    marginHorizontal: 0,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  card: {
    width: "100%",
    margin: 0,
  },
  property: {
    fontSize: 13,
  },
  value: {
    fontSize: 16,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
