import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { TouchableOpacity, View } from 'react-native';
import {
  Avatar,
  Divider,
  Drawer,
  Icon,
  Text,
  useTheme,
} from 'react-native-paper';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <TouchableOpacity
          style={{
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Avatar.Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjfC2G0DZgHsNbml5F0GoWhFS3eElD1aSYQiPNabQ&s',
            }}
          />
          <View style={{ gap: 5, marginRight: 'auto' }}>
            <Text style={{ fontSize: 20 }}>Emmmanuel Akwuba</Text>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
            >
              <Icon source={'star'} size={20} />
              <Text style={{ fontSize: 20 }}>4.93</Text>
            </View>
          </View>
          <Icon size={24} source={'chevron-right'} />
        </TouchableOpacity>
        <Divider style={{ marginBottom: 20 }} />
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Divider />
      <View style={{ padding: 20, paddingBottom: 30 }}>
        <Text style={{ textAlign: 'center', color: colors.primary }}>
          Emirace 2024
        </Text>
      </View>
    </View>
  );
};

export default CustomDrawerContent;
