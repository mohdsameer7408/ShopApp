import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import { addToCart } from "../../features/cartSlice";

const ProductDetailScreen = ({ navigation, route }) => {
  const { imageUrl, price, description } = route.params;
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.actions}>
        <Button
          title="Add To Cart"
          onPress={() => dispatch(addToCart(route.params))}
          color={Colors.primaryColor}
        />
      </View>
      <Text style={styles.price}>${price.toFixed(2)}</Text>
      <Text style={styles.description}>{description}</Text>
    </ScrollView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
  price: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
  description: {
    fontFamily: "open-sans",
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
});
