// @ts-nocheck
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { FeedStackScreen } from "./ScreenStacks";
import { Map, Settings, Notifications } from "../Screens";
const Tab = createBottomTabNavigator();

export default (): JSX.Element => {
  return (
    <Tab.Navigator
      id="tabStack"
      initialRouteName="Map"
      screenOptions={{
        tabBarStyle: { backgroundColor: "#006699" },
      }}
    >
      <Tab.Screen
        name="FeedTab"
        component={FeedStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: "List",
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "#81BAD6",
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
        name="MapTab"
        component={Map}
        options={{
          tabBarLabel: "Map",
          headerShown: false,
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "#81BAD6",
          tabBarIcon: ({ color }) => (
            <Entypo name="location" size={26} color={color} />
          ),
          title: "Map",
        }}
      />

      <Tab.Screen
        name="NotificationsTab"
        component={Notifications}
        options={{
          tabBarLabel: "Updates",
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "#81BAD6",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
          title: "Notifications",
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={Settings}
        options={{
          tabBarLabel: "Settings",
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "#81BAD6",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog" color={color} size={26} />
          ),
          title: "Settings",
        }}
      />
    </Tab.Navigator>
  );
};
