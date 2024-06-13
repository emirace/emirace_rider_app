import { View, Text } from 'react-native';
import React from 'react';
import { VerificationStatusNavigationProp } from '../../../type/navigation/stack';

const VerificationStatus: React.FC<VerificationStatusNavigationProp> = () => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Text>VerificationStatus</Text>
    </View>
  );
};

export default VerificationStatus;
