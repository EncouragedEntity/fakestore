import React from "react";
import {
  View,
  TextInput,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  Text,
} from 'react-native';
import styles from './styles';

type Props = TextInputProps & {
  label?: string;
  error?: string;
};
export default React.memo<Props>(({
  label,
  error,
  onFocus,
  onBlur,
  style,
  multiline,
  ...rest
}) => {

  const [isFocused, setFocused] = React.useState(false);

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(true);
    onFocus?.(e);
  };
  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          error && styles.inputError,
          multiline && styles.inputMultiline,
          style,
        ]}
        placeholderTextColor="#999"
        underlineColorAndroid="transparent"
        onFocus={handleFocus}
        onBlur={handleBlur}
        multiline={multiline}
        {...rest}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
});