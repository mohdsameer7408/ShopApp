import React, { useCallback, useEffect, useReducer, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";
import Input from "../../components/UI/Input";
import ShopHeaderButton from "../../components/UI/ShopHeaderButton";
import Colors from "../../constants/Colors";
import {
  createProductAsync,
  updateProductAsync,
} from "../../features/productsSlice";

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

const EditProductScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: route.params ? route.params.title : "",
      imageUrl: route.params ? route.params.imageUrl : "",
      price: route.params ? route.params.price.toString() : "",
      description: route.params ? route.params.description : "",
    },
    inputValidities: {
      title: route.params ? true : false,
      price: route.params ? true : false,
      imageUrl: route.params ? true : false,
      description: route.params ? true : false,
    },
    formIsValid: route.params ? true : false,
  });

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

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong Input!", "Please check the errors in the form.", [
        { text: "Ok" },
      ]);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      if (route.params) {
        await dispatch(
          updateProductAsync({
            ...route.params,
            title: formState.inputValues.title,
            imageUrl: formState.inputValues.imageUrl,
            description: formState.inputValues.description,
          })
        );
      } else {
        await dispatch(
          createProductAsync({
            title: formState.inputValues.title,
            // +price can also be used for casting
            price: parseFloat(formState.inputValues.price),
            imageUrl: formState.inputValues.imageUrl,
            description: formState.inputValues.description,
          })
        );
      }
      navigation.goBack();
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setIsLoading(false);
  }, [formState, dispatch]);

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured!", error, [{ text: "Ok" }]);
    }
  }, [error]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={ShopHeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
            }
            onPress={submitHandler}
          />
        </HeaderButtons>
      ),
    });
    // navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  if (isLoading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={10}
      style={styles.screen}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="TITLE"
            errorText="Please enter a valid title"
            initialValue={formState.inputValues.title}
            onInputChange={inputChangeHandler}
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            initiallyValid={formState.inputValidities.title}
            required
          />
          <Input
            id="imageUrl"
            label="ImageUrl"
            errorText="Please enter a valid image url"
            initialValue={formState.inputValues.imageUrl}
            onInputChange={inputChangeHandler}
            returnKeyType="next"
            initiallyValid={formState.inputValidities.imageUrl}
            required
          />
          <Input
            id="price"
            label="Price"
            errorText="Please enter a valid price"
            initialValue={formState.inputValues.price}
            onInputChange={inputChangeHandler}
            returnKeyType="next"
            editable={!route.params}
            keyboardType="decimal-pad"
            initiallyValid={formState.inputValidities.price}
            required
            min={0.1}
          />
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description"
            initialValue={formState.inputValues.description}
            onInputChange={inputChangeHandler}
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            initiallyValid={formState.inputValidities.title}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  form: {
    margin: 20,
  },
  loadingScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
