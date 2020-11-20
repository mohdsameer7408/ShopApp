import React from "react";
import { FlatList, Button, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";
import { removeDeletedProduct } from "../../features/cartSlice";
import {
  deleteProductAsync,
  selectUserProducts,
} from "../../features/productsSlice";
import SecondaryScreen from "../shop/SecondaryScreen";

const UserProductsScreen = ({ navigation }) => {
  const products = useSelector(selectUserProducts);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this product?", [
      { text: "NO", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(deleteProductAsync({ id }));
          dispatch(removeDeletedProduct({ id }));
        },
      },
    ]);
  };

  const editProductHandler = (product) => {
    navigation.navigate("EditProductScreen", product);
  };

  return products.length ? (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(product) => (
        <ProductItem
          navigation={navigation}
          product={product.item}
          onSelect={() => editProductHandler(product.item)}
        >
          <Button
            title="Edit"
            onPress={() => editProductHandler(product.item)}
            color={Colors.primaryColor}
          />
          <Button
            title="Delete"
            onPress={() => handleDelete(product.item.id)}
            color={Colors.primaryColor}
          />
        </ProductItem>
      )}
    />
  ) : (
    <SecondaryScreen>
      No products found, maybe start creating some!
    </SecondaryScreen>
  );
};

export default UserProductsScreen;
