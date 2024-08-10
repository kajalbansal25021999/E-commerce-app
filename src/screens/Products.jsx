import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SearchBar from '../components/SearchBar';

const {width} = Dimensions.get('window');

const Products = ({navigation}) => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        'https://dummyjson.com/products/category-list',
      );
      const data = await response.json();
      setCategories(data);
      await fetchItemsForCategories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchItemsForCategories = async categories => {
    let allItems = {};
    for (const category of categories) {
      const response = await fetch(
        `https://dummyjson.com/products/category/${category}`,
      );
      const data = await response.json();
      allItems[category] = data.products;
    }
    setItems(allItems);
  };

  const handleCatgeoryClick = category => {
    navigation.navigate('ProductsByCategory', {category});
  };

  const FixedSearchHeader = () => {
    return <SearchBar handleBackPress={() => {}} />;
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <FlatList
      data={categories}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item}
      contentContainerStyle={{backgroundColor: '#fff'}}
      ListHeaderComponent={FixedSearchHeader}
      stickyHeaderIndices={[0]}
      renderItem={({item: category}) => (
        <View style={{paddingBottom: 12, paddingHorizontal: 12}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <TouchableOpacity onPress={() => handleCatgeoryClick(category)}>
              <Text style={styles.title}>{category.toUpperCase()}</Text>
            </TouchableOpacity>
            <Image source={require('../assets/line.png')} />
          </View>

          <FlatList
            data={items[category]}
            keyExtractor={item => item.id.toString()}
            style={{marginBottom: 12}}
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
      )}
    />
  );
};

export default Products;

const styles = StyleSheet.create({
  title: {color: '#6B6062', fontWeight: '500', marginRight: 16, fontSize: 9.6},
  item: {
    fontWeight: '500',
    marginTop: 4,
    color: '#2A2A2A',
    textAlign: 'center',
    fontSize: 10,
  },
});
