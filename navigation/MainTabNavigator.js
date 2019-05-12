import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import FavouritesScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ParkScreen from '../screens/Park';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Park: ParkScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const FavouritesStack = createStackNavigator({
  Favourites: FavouritesScreen,
});

FavouritesStack.navigationOptions = {
  tabBarLabel: 'Favourites',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-star' : 'md-star'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  FavouritesStack,
  SettingsStack,
}, {
  tabBarOptions: {
    safeAreaInset: {
      bottom: 'never', top: 'never'
    }
  }
});
