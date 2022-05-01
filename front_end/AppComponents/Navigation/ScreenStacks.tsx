import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feed, Notifications, Settings, Profile } from "../Screens";
import { EntityProperties } from "../Screens/EntityProperties";
import MissingProperties from "../Screens/MissingProperties";

const SettingsStack = createNativeStackNavigator();
const FeedStack = createNativeStackNavigator();
const NotificationStack = createNativeStackNavigator();

export const FeedStackScreen = () => (
  <FeedStack.Navigator initialRouteName="Feed">
    <FeedStack.Screen
      name="Feed"
      component={Feed}
      options={{ headerShown: false }}
    />
    <FeedStack.Screen
      name="Properties"
      component={EntityProperties}
      options={{ title: "Properties" }}
    />
    <FeedStack.Screen
      name="MissingProperties"
      component={MissingProperties}
      options={{ title: "Missing Properties" }}
    />
  </FeedStack.Navigator>
);

export const SettingsStackScreen = () => (
  <SettingsStack.Navigator initialRouteName="Settings">
    <SettingsStack.Screen name="Settings" component={Settings} />
    <SettingsStack.Screen name="Profile" component={Profile} />
  </SettingsStack.Navigator>
);

export const NotificationsStackScreen = () => (
  <NotificationStack.Navigator initialRouteName="Notifications">
    <NotificationStack.Screen name="Notifications" component={Notifications} />
  </NotificationStack.Navigator>
);
