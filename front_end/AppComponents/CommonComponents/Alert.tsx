import { Alert } from "react-native";

export default (clearCache) =>
  Alert.alert("Alert Title", "Are you sure you want to clear cache?", [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
    { text: "OK", onPress: clearCache },
  ]);
