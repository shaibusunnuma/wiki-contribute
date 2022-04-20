// @ts-nocheck
import * as React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
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
          tabBarLabel: "List",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="format-list-bulleted"
              color={color}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarLabel: "Map",
          tabBarIcon: ({ color }) => (
            <Entypo name="location" size={26} color={color} />
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
