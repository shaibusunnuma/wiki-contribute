import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { View, Button, Text } from "react-native";
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
import { RootStackParamList } from "../CustomTypes";
import EditQueryRangeForm from "../CommonComponents/EditQueryRangeForm";

type EntityListProps = NativeStackScreenProps<RootStackParamList, "Home">;

export default ({ route, navigation }: EntityListProps) => {
  const { clearCache, queryRange } = React.useContext(WikiContext);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <SettingsPage style={{ flex: 1 }}>
        <SectionRow>
          <NavigateRow
            text="Profile"
            leftIcon={{
              name: "account",
              type: "material-community",
            }}
            onPress={() => console.log("terms")}
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
              name: "tag",
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
            onValueChange={(isChecked: boolean) =>
              console.log("checked", isChecked)
            }
          />
          <SwitchRow
            text="Do not disturb"
            disabled
            leftIcon={{
              name: "do-not-disturb",
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
    </View>
  );
};
