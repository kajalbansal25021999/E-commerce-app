/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Orders from './src/screens/Orders';
import Products from './src/screens/Products';
import Overview from './src/screens/Overview';
import Profile from './src/screens/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductsByCategory from './src/screens/ProductsByCategory';
import Search from './src/screens/Search';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  const TabNavigator = () => {
    return (
      <Tab.Navigator
        initialRouteName="Products"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let icon;

            if (route.name === 'Orders') {
              icon = require('./src/assets/orders.png');
            } else if (route.name === 'Products') {
              icon = require('./src/assets/products.png');
            } else if (route.name === 'Overview') {
              icon = require('./src/assets/overview.png');
            } else if (route.name === 'Profile') {
              icon = require('./src/assets/person.png');
            }

            return (
              <Image
                source={icon}
                style={{
                  width: size,
                  height: size,
                }}
              />
            );
          },
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'white',
            paddingVertical: 6,
            paddingHorizontal: 12,
            paddingBottom: 12,
          },
          tabBarLabelStyle: {color: '#6B6062'},
          tabBarButton: props => {
            const {children, onPress, accessibilityState} = props;
            const isSelected = accessibilityState.selected;

            return (
              <TouchableOpacity
                onPress={onPress}
                style={{
                  height: 36,
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 6,
                  backgroundColor: isSelected ? '#f1efef' : 'transparent',
                  borderRadius: 4,
                }}>
                {children}
              </TouchableOpacity>
            );
          },
        })}>
        <Tab.Screen name="Orders" component={Orders} />
        <Tab.Screen name="Products" component={Products} />
        <Tab.Screen name="Overview" component={Overview} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen
            name="ProductsByCategory"
            component={ProductsByCategory}
          />
          <Stack.Screen name="Search" component={Search} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {flex: 1},
});
