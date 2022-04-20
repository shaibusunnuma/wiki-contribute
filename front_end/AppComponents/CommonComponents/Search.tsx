//@ts-nocheck
import React from "react";
import { SafeAreaView, Dimensions, StyleSheet } from "react-native";
import SearchBar from "react-native-dynamic-search-bar";

const width = Dimensions.get("window").width;

export default function Search() {
  const [searchWord, setSearchWord] = React.useState("");

  return (
    <>
      <SafeAreaView style={styles.header_safe_area}>
        <SearchBar
          placeholder="Search here"
          onPress={() => alert("onPress")}
          onChangeText={(text) => console.log(text)}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  header_safe_area: {
    zIndex: 1,
  },
  header: {
    height: 50,
    paddingHorizontal: 16,
  },
  header_inner: {
    flex: 1,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },
  search_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: "#e4e6eb",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input_box: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "white",
    width: width - 32,
  },
  back_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#e4e6eb",
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 16,
  },
});
