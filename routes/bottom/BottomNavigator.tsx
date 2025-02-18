import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, View } from 'react-native';

const Tab = createBottomTabNavigator();
const screenOptions = {
  headerShown: false,
//   tabBarActiveTintColor: colors.primary,
  tabBarStyle: {
    height: Platform.OS === "ios" ? 72 : 52,
    paddingBottom: 5
  },
};

const TabNavigator: React.FC = () => {
  return <View />
  // return (
  //   <Tab.Navigator initialRouteName='dashboard' screenOptions={screenOptions}>

  //   </Tab.Navigator>
  // );
};

export default TabNavigator;
