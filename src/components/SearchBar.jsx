import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const SearchBar = ({category = 'Product Categories'}) => {
  const navigation = useNavigation();

  const capitalizeWords = str => {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };
  const formattedCategory = capitalizeWords(category);

  const handleBackBtn = () => navigation.pop();

  const handleSearchClick = () => {
    navigation.navigate('Search');
  };

  return (
    <View
      style={{
        backgroundColor: '#fff',
        height: 60,
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 16,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={handleBackBtn}>
            <Image
              source={require('../assets/back.png')}
              style={{marginLeft: 16}}
            />
          </TouchableOpacity>
          <View style={{marginLeft: 16}}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              {formattedCategory}
            </Text>
            <Text style={{fontWeight: '400', fontSize: 12}}>
              Select any product to add
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleSearchClick}>
          <Image
            source={require('../assets/search.png')}
            style={{marginRight: 24}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
