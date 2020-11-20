import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Card from "../UI/Card";

const ProductItem = ({ product, navigation, onSelect, children }) => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableComponent onPress={onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: product.imageUrl }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <View style={styles.detail}>
              <Text style={styles.title}>{product.title}</Text>
              <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>{children}</View>
          </View>
        </TouchableComponent>
      </View>
    </Card>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
  },
  touchable: {
    overflow: "hidden",
    borderRadius: 10,
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    overflow: "hidden",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detail: {
    alignItems: "center",
    height: "17%",
    padding: 10,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginVertical: 2,
  },
  price: {
    fontFamily: "open-sans",
    fontSize: 14,
    color: "#888",
  },
  actions: {
    height: "23%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
