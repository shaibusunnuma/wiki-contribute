import * as React from "react";
import { Text, View } from "react-native";
import Map from "./Map";
import Settings from "./Settings";
import Feed from "./Feed";
import Profile from "./UserProfile";
import LandingPage from "./LandingPage";
import Camera from "../CommonComponents/Camera";

export function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Notifications!</Text>
    </View>
  );
}

export { Map, Feed, Settings, Profile, LandingPage, Camera };
