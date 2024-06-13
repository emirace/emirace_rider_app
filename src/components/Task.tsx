import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Divider, IconButton, List, Text, useTheme } from 'react-native-paper';
import Button from './Button';

interface Props {
  openPlanner: () => void;
}
const Task: React.FC<Props> = ({ openPlanner }) => {
  const { colors } = useTheme();
  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <IconButton
            icon={'motorbike-electric'}
            size={30}
            onPress={openPlanner}
            style={{ backgroundColor: colors.elevation.level5 }}
          />
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
            You're Offline
          </Text>
        </View>
        <Button mode="contained" style={{ borderRadius: 100, marginRight: 10 }}>
          Go
        </Button>
      </View>
      <Divider />
      <View style={{ padding: 20, gap: 20 }}>
        <List.Item
          title="Queue"
          description="Take task from queued delivery"
          titleStyle={styles.titleStyle}
          onPress={() => {}}
          left={(props) => <List.Icon {...props} icon="timer" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
        />
        {/* <Divider /> */}
        <List.Item
          title="Today's History"
          description="See how far you have gone today"
          titleStyle={styles.titleStyle}
          onPress={() => {}}
          left={(props) => <List.Icon {...props} icon="timer" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    fontWeight: '600',
    fontSize: 18,
    textTransform: 'uppercase',
    paddingVertical: 10,
  },
});
export default Task;
