import * as React from "react";
import { View, Button, Text, SafeAreaView } from "react-native";
import {
  SectionRow,
  SettingsPage,
  NavigateRow,
  BaseRow,
  SwitchRow,
} from "react-native-settings-view";
import Modal from "react-native-modal";
import { WikiContext } from "../../Context";
import createAlert from "../CommonComponents/Alert";
import EditQueryRangeForm from "../CommonComponents/EditQueryRangeForm";
import { FontAwesome } from "@expo/vector-icons";

export default ({ route, navigation }) => {
  const { clearCache, queryRange, setAnonymous, setTrackLocation } =
    React.useContext(WikiContext);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <SettingsPage style={{ flex: 1 }}>
        <SectionRow>
          <NavigateRow
            text="Profile"
            leftIcon={{
              name: "account",
              type: "material-community",
            }}
            onPress={() => {
              navigation.push("Profile");
            }}
          />
          <NavigateRow
            text="Privacy Policy"
            leftIcon={{
              name: "folder-lock",
              type: "material-community",
            }}
            onPress={() => console.log("policy")}
          />
          <NavigateRow
            text="Contact us"
            leftIcon={{
              name: "users",
              type: "font-awesome",
            }}
            onPress={() => console.log("contact")}
          />
          <BaseRow
            text="Query range"
            leftIcon={{
              name: "globe",
              type: "font-awesome",
            }}
            rightContent={<Text>{queryRange}</Text>}
            onPress={toggleModal}
          />
          <SwitchRow
            text="Track location"
            disabled
            leftIcon={{
              name: "my-location",
              type: "material-icons",
            }}
            onValueChange={(isEnabled: boolean) => setTrackLocation(isEnabled)}
          />
          <SwitchRow
            text="Anonymouse mode"
            disabled
            leftIcon={{
              name: "account-cowboy-hat",
              type: "material-community",
            }}
            onValueChange={(isEnabled: boolean) => setAnonymous(isEnabled)}
          />
          <BaseRow
            text="Clear Cache"
            leftIcon={{
              name: "brush",
              type: "material-community-icons",
            }}
            onPress={() => createAlert(clearCache)}
          />
          {/* <MaterialCommunityIcons name="broom" size={24} color="black" /> */}
        </SectionRow>
        <SectionRow style={{ marginTop: 5 }}>
          <BaseRow
            text="Sign Out"
            style={{ paddingVertical: 5 }}
            rightContent={
              <FontAwesome name="sign-out" size={24} color="black" />
            }
            onPress={() => console.log("Sign Out")}
          />
        </SectionRow>
      </SettingsPage>
      <View
        style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ color: "gray" }}>Version v1.0.0</Text>
      </View>
      <Modal isVisible={isModalVisible}>
        <View>
          <EditQueryRangeForm toggleModal={toggleModal} />
          <View>
            <Button color="white" title="Hide modal" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
