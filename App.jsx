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

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
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
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {flex: 1},
});
