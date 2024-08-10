import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Orders = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Orders</Text>
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {
    color: 'black',
  },
});
