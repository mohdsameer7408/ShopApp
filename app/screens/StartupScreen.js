import React, { useEffect } from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import { login, setLogoutTimer } from "../features/authSlice";

const StartupScreen = ({ setIsLoading }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getFromAsyncStorage = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (!userData) {
          setIsLoading(false);
          return;
        }
        const data = JSON.parse(userData);
        const { token, userId, expirationDate } = data;

        const expiryDate = new Date(expirationDate);
        if (expiryDate <= new Date() || !token || !userId) {
          setIsLoading(false);
          return;
        }

        dispatch(login(data));
        dispatch(setLogoutTimer(expiryDate.getTime() - new Date()));
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    getFromAsyncStorage();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primaryColor} />
    </View>
  );
};

export default StartupScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
