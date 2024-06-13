import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import { useTheme } from 'react-native-paper';

interface TokenInputProps extends TextInputProps {
  innerRef: React.RefObject<TextInput>;
}

const TokenInput: React.FC<TokenInputProps> = ({ innerRef, ...props }) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <TextInput
      ref={innerRef}
      style={[
        styles.input,
        {
          backgroundColor: colors.elevation.level5,
          color: colors.onBackground,
          borderColor: isFocused ? colors.background : colors.elevation.level5,
          shadowColor: isFocused ? colors.primary : 'transparent',
          shadowOffset: isFocused
            ? { width: 0, height: 2 }
            : { width: 0, height: 0 },
          shadowOpacity: isFocused ? 0.3 : 0,
          elevation: isFocused ? 3 : 0,
        },
      ]}
      selectionColor={colors.primary}
      onFocus={handleFocus}
      onBlur={handleBlur}
      keyboardType="numeric"
      maxLength={1}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 30,
    width: 60,
    height: 60,
    borderRadius: 5,
    textAlign: 'center',
    borderWidth: 1,
  },
});

export default TokenInput;
