import { ProductStack, routes } from "app/navigation";
import React from "react";
import { Text, View } from "react-native";

type Props = ProductStack<typeof routes.products.list>;

export default React.memo<Props>(() => {
  return (
    <View>
      <Text>Product List</Text>
    </View>
  );
});