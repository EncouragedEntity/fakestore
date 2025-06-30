import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
type Props = {
  image: string;
  title: string;
  price: number;
  onPress?: () => void;
};

export default React.memo<Props>(props => {
  const { image, title, price, onPress } = props;

  return (
     <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
});