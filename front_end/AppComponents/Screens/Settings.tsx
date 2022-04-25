import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { View, Button, Text, SafeAreaView } from "react-native";
import {
  SectionRow,
  SettingsPage,
  NavigateRow,
  BaseRow,
  CheckRow,
  SwitchRow,
} from "react-native-settings-view";
import Modal from "react-native-modal";
import { WikiContext } from "../../Context";
import createAlert from "../CommonComponents/Alert";
import { SettingsStackParamList } from "../CustomTypes";
import EditQueryRangeForm from "../CommonComponents/EditQueryRangeForm";

type EntityListProps = NativeStackScreenProps<
  SettingsStackParamList,
  "Settings"
>;
//ts-ignore
export default ({ route, navigation }) => {
  const { clearCache, queryRange, setAnonymous } =
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
          <CheckRow
            text="Notifications"
            checked
            leftIcon={{
              name: "ios-notifications",
              type: "ionicon",
            }}
            onValueChange={(isChecked: boolean) => setAnonymous(isChecked)}
          />
          <SwitchRow
            text="Anonymouse mode"
            disabled
            leftIcon={{
              name: "account-cowboy-hat",
              type: "material-community",
            }}
            onValueChange={(isEnabled: boolean) =>
              console.log("checked", isEnabled)
            }
          />
          <BaseRow
            text="version"
            leftIcon={{
              name: "tag",
              type: "font-awesome",
            }}
            rightContent={<Text>0.1.0</Text>}
          />
        </SectionRow>
      </SettingsPage>
      <View
        style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}
      >
        <Button title="Clear Cache" onPress={() => createAlert(clearCache)} />
        <Text style={{}}>Version 1.0.0</Text>
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
