import React, { useReducer, useCallback, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";
import { useDispatch } from "react-redux";
import { signUpAsync, signInAsync } from "../../features/authSlice";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.inputId]: action.value,
    };
    const updatedValidites = {
      ...state.inputValidities,
      [action.inputId]: action.isValid,
    };

    let formIsValid = true;
    for (let key in updatedValidites) {
      formIsValid = formIsValid && updatedValidites[key];
    }
    return {
      ...state,
      inputValues: updatedValues,
      inputValidities: updatedValidites,
      formIsValid,
    };
  }
  return state;
};

const AuthScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    error &&
      Alert.alert("An error occured!", error, [
        { text: "Ok", onPress: () => setError(null) },
      ]);
  }, [error]);

  const inputChangeHandler = useCallback(
    (inputId, text, isValid) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: text,
        isValid,
        inputId,
      });
    },
    [dispatchFormState]
  );

  const authHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong Input!", "Please check for errors in the form.", [
        { text: "Ok" },
      ]);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      let action;
      if (isSignUp) {
        action = signUpAsync;
      } else {
        action = signInAsync;
      }
      await dispatch(
        action({
          email: formState.inputValues.email,
          password: formState.inputValues.password,
        })
      );
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }, [formState, dispatch, isSignUp]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={10}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address"
              onInputChange={inputChangeHandler}
              initialValue={formState.inputValues.email}
              initiallyValid={formState.inputValidities.email}
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a password atleast 5 characters long"
              onInputChange={inputChangeHandler}
              initialValue={formState.inputValues.password}
              initiallyValid={formState.inputValidities.password}
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primaryColor} />
              ) : (
                <Button
                  title={isSignUp ? "Sign Up" : "Login"}
                  color={Colors.primaryColor}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignUp ? "Login" : "Sign Up"}`}
                color={Colors.accentColor}
                onPress={() => setIsSignUp((prevValue) => !prevValue)}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
