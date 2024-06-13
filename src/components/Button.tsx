import React from 'react';
import { Button as DefaultButton, ButtonProps } from 'react-native-paper';

const Button: React.FC<ButtonProps> = ({ ...props }) => {
  return (
    <DefaultButton
      contentStyle={{ height: 50 }}
      labelStyle={{ fontWeight: 'bold', fontSize: 18 }}
      style={{ borderRadius: 100 }}
      {...props}
    >
      {props.children}
    </DefaultButton>
  );
};

export default Button;
