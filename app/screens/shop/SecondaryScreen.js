import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SecondaryScreen = ({ children }) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{children}</Text>
    </View>
  );
};

export default SecondaryScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans",
  },
});
