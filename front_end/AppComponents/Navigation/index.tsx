import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigation from "./TabNavigation";
import { Camera } from "../Screens";

const AppNavigator = createNativeStackNavigator();

export default () => (
  <AppNavigator.Navigator initialRouteName="TabNavigation">
    <AppNavigator.Screen
      name="TabNavigation"
      component={TabNavigation}
      options={{ headerShown: false }}
    />
    <AppNavigator.Screen
      name="Camera"
      component={Camera}
      options={{ headerShown: false }}
    />
  </AppNavigator.Navigator>
);
