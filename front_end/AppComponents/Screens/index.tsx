import * as React from "react";
import { Text, View } from "react-native";
import Map from "./Map";
import Settings from "./Settings";
import Feed from "./Feed";
import LandingPage from "./LandingPage";
import Camera from "./Camera";
import EntityProperties from "./EntityProperties";
import MissingProperties from "./MissingProperties";

export function Notifications() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Notifications!</Text>
        </View>
    );
}

export { Map, Feed, Settings, LandingPage, Camera, EntityProperties, MissingProperties };
