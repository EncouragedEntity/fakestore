import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import FastImage from "react-native-fast-image";
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
      <FastImage
        style={styles.image}
        source={{ uri: image }}
        resizeMode={FastImage.resizeMode.contain}
      />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
});