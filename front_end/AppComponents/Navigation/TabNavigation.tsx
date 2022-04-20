// @ts-nocheck
import * as React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  FeedStackScreen,
  NotificationsStackScreen,
  SettingsStackScreen,
} from "./ScreenStacks";
import { Map } from "../Screens";
const Tab = createMaterialBottomTabNavigator();

export default (): JSX.Element => {
  return (
    <Tab.Navigator
      id="tabStack"
      initialRouteName="Map"
      activeColor="#ffffff"
      barStyle={{ backgroundColor: "#006699" }}
    >
      <Tab.Screen
        name="FeedTab"
        component={FeedStackScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarLabel: "Map",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="NotificationsTab"
        component={NotificationsStackScreen}
        options={{
          tabBarLabel: "Updates",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
          title: "Notifications",
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsStackScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
