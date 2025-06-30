import React from 'react';
import {
  Text,
  Pressable,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
} from 'react-native';
import styles from './styles';

type Props = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
};
export default React.memo<Props>(props => {
  const {
    title,
    onPress,
    disabled = false,
    style,
    textStyle
  } = props;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      android_ripple={{ color: '#eee' }}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={[styles.text, disabled && styles.textDisabled, textStyle]}>
        {title}
      </Text>
    </Pressable>
  );
});