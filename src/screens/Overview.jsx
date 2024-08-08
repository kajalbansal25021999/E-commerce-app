import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Overview = () => {
  return (
    <View style={styles.container}>
      <Text>Overview</Text>
    </View>
  );
};

export default Overview;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
