import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SearchBar from '../components/SearchBar';

const {width} = Dimensions.get('window');

const ProductsByCategory = ({route}) => {
  const [items, setItems] = useState([]);
  const {category} = route.params;
  useEffect(() => {
    fetchCategoriesItems();
  }, []);

  const fetchCategoriesItems = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/category/${category}`,
      );
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  const FixedSearchHeader = () => {
    return <SearchBar category={category} />;
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <FlatList
        data={items && items.products}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{
          borderWidth: 1,
          borderColor: 'red',
        }} // it should be removed
        style={{borderWidth: 1, borderColor: 'yellow'}} // it should be removed
        ListHeaderComponent={FixedSearchHeader}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={props => {
          return (
            <View
              style={{
                height: 20,
              }}
            />
          );
        }}
        renderItem={({item}) => {
          const image = item && item.thumbnail;
          return (
            <View
              style={{
                maxWidth: (width - 30) / 4,
                flex: 1,
                alignItems: 'center',
              }}>
              <Image
                source={{uri: image}}
                style={{
                  height: 64,
                  width: 64,
                  borderWidth: 1,
                  borderColor: '#F1EFEF',
                  borderRadius: 8,
                }}
              />
              <Text style={styles.item}>{item.title}</Text>
            </View>
          );
        }}
        numColumns={4}
      />
    </View>
  );
};

export default ProductsByCategory;

const styles = StyleSheet.create({
  item: {
    fontWeight: '500',
    marginTop: 4,
    color: '#2A2A2A',
    textAlign: 'center',
  },
});
