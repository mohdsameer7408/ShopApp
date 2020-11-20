import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Drawer, Caption, Title, Avatar } from "react-native-paper";
import Colors from "../constants/Colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUserEmail } from "../features/authSlice";

const DrawerContent = (props) => {
  const user = useSelector(selectUserEmail);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.profile}>
            <Avatar.Image
              source={{
                uri:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTxvyM87RyvMZY3_7wbC2_aB5iAELtG4EPkHA&usqp=CAU",
              }}
              size={60}
            />
            <View style={styles.userInfo}>
              <Title style={styles.userName}>{user.split("@", 1)[0]}</Title>
              <Caption style={styles.userEmail}>{user}</Caption>
            </View>
          </View>
          <Drawer.Section style={styles.topSection}>
            <DrawerItem
              label="Products"
              icon={({ color, size }) => (
                <Ionicons
                  name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                  color={color}
                  size={size}
                />
              )}
              onPress={() => props.navigation.navigate("ShopStack")}
            />
            <DrawerItem
              label="Orders"
              icon={({ color, size }) => (
                <Ionicons
                  name={Platform.OS === "android" ? "md-list" : "ios-list"}
                  color={color}
                  size={size}
                />
              )}
              onPress={() => props.navigation.navigate("OrdersStack")}
            />
            <DrawerItem
              label="Manage Products"
              icon={({ color, size }) => (
                <Ionicons
                  name={Platform.OS === "android" ? "md-create" : "ios-create"}
                  color={color}
                  size={size}
                />
              )}
              onPress={() => props.navigation.navigate("UserStack")}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomSection}>
        <DrawerItem
          label="Logout"
          icon={({ color, size }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
              color={color}
              size={size}
            />
          )}
          onPress={handleLogout}
        />
        <DrawerItem
          label="2020, All rights reserved."
          icon={({ color, size }) => (
            <FontAwesome name="copyright" color={color} size={size} />
          )}
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -4,
  },
  drawerContent: {
    flex: 1,
  },
  profile: {
    padding: 20,
    backgroundColor: Colors.primaryColor,
  },
  userInfo: {
    marginTop: 10,
  },
  userName: {
    fontFamily: "open-sans-bold",
    color: "#fff",
  },
  userEmail: {
    fontFamily: "open-sans",
    color: "#ffe6f2",
  },
  topSection: {
    marginVertical: 10,
  },
  bottomSection: {
    borderColor: "#ccc",
    borderTopWidth: 1,
  },
});
