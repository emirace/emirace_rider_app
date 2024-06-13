import { View, Text } from "react-native";
import React from "react";
import { Appbar, List } from "react-native-paper";
import { SettingsNavigationProp } from "../../type/navigation/drawer";

const Settings: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View>
      <Appbar.Header mode="medium">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          titleStyle={{
            fontSize: 30,
            fontWeight: "bold",
          }}
          title="Settings"
        />
      </Appbar.Header>

      <View style={{ paddingHorizontal: 20 }}>
        <List.Section>
          <List.Subheader>General</List.Subheader>

          <List.Item
            title="Notification"
            description="Control your notification"
            titleStyle={{
              fontSize: 22,
            }}
            descriptionStyle={{ fontSize: 18 }}
            left={() => <List.Icon icon="bell-outline" />}
            right={() => <List.Icon icon="chevron-right" />}
            // onPress={() => navigation.navigate('Appearance')}
          />
        </List.Section>
        <List.Section>
          <List.Subheader>Appearance</List.Subheader>
          <List.Item
            title="Theme"
            description="Select your prefered theme"
            titleStyle={{
              fontSize: 22,
            }}
            left={() => <List.Icon icon="theme-light-dark" />}
            right={() => <List.Icon icon="chevron-right" />}
            descriptionStyle={{ fontSize: 18 }}
            onPress={() => navigation.navigate("Appearance")}
          />
        </List.Section>
      </View>
    </View>
  );
};

export default Settings;
