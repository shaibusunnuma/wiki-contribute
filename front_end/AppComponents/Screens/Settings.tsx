import * as React from "react";
import { Text, View, Button } from "react-native";
import {
  SectionRow,
  SettingsPage,
  NavigateRow,
  BaseRow,
  CheckRow,
  SwitchRow,
} from "react-native-settings-view";

export default () => {
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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button
          title="Clear Cache"
          onPress={() => console.log("clear cache")}
        />
        <Text style={{}}>Version 1.0.0</Text>
      </View>
    </View>
  );
};
