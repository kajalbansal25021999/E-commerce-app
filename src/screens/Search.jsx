import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const Search = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [latestProducts, setLatestProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [detailedProducts, setDetailedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    fetchLatestProducts();
  }, []);

  const fetchLatestProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://dummyjson.com/products?limit=10');
      const data = await response.json();
      setLatestProducts(data.products);
    } catch (error) {
      console.error('Error fetching latest products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRelatedProducts = async query => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${query}`,
      );
      const data = await response.json();
      setFilteredProducts(data.products);
      setShowSuggestions(true);
      setDetailedProducts([]);
    } catch (error) {
      console.error('Error fetching related products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = () => {
    setDetailedProducts(filteredProducts);
    setShowSuggestions(false);
  };

  const handleCancelSearch = () => {
    setSearchQuery('');
    setFilteredProducts([]);
    setDetailedProducts([]);
    setShowSuggestions(true);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 4,
          marginRight: 12,
          marginTop: 20,
          marginBottom: 16,
        }}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            backgroundColor: '#fff',
            borderRadius: 25,
            paddingHorizontal: 10,
            alignItems: 'center',
            marginLeft: 10,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 3,
          }}>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Image
              source={require('../assets/back.png')}
              style={{height: 20, width: 20, tintColor: '#C5BEC0'}}
            />
          </TouchableOpacity>
          <TextInput
            style={{
              flex: 1,
              height: 50,
              marginLeft: 10,
              color: '#2A2A2A',
            }}
            placeholder="Search products..."
            placeholderTextColor="#C5BEC0"
            cursorColor="#C5BEC0"
            selectionColor="#C5BEC0"
            value={searchQuery}
            onChangeText={text => {
              setSearchQuery(text);
              fetchRelatedProducts(text);
            }}
            onSubmitEditing={handleSearchSubmit}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleCancelSearch}>
              <Image
                source={require('../assets/cancel.png')}
                style={{height: 20, width: 20}}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleSearchSubmit}>
            <Image
              source={require('../assets/search.png')}
              style={{
                height: 20,
                width: 20,
                tintColor: '#C5BEC0',
                marginLeft: 8,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {showSuggestions && filteredProducts.length > 0 && (
            <FlatList
              data={filteredProducts}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => {
                const image = item && item.thumbnail;
                return (
                  <TouchableOpacity
                    onPress={handleSearchSubmit}
                    style={{
                      paddingHorizontal: 12,
                      marginVertical: 6,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={{uri: image}}
                      style={{
                        height: 26,
                        width: 20,
                      }}
                    />
                    <Text
                      style={
                        ([styles.item],
                        {fontWeight: '400', marginLeft: 8, color: '#2A2A2A'})
                      }>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          )}
          {detailedProducts.length > 0 && (
            <FlatList
              data={detailedProducts}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => {
                const image = item && item.thumbnail;
                return (
                  <View style={styles.detailContainer}>
                    <View style={styles.firstView}>
                      <Text style={styles.productTitle}>{item.title}</Text>
                      <View style={styles.nameContainer}>
                        <Text style={styles.name}>{item.weight}0g</Text>
                        <Text style={styles.name}>{item.price}</Text>
                      </View>
                    </View>
                    <View style={styles.secondView}>
                      <Image
                        source={{uri: image}}
                        style={styles.productImage}
                      />
                      <TouchableOpacity style={styles.addButton}>
                        <Text style={styles.addButtonText}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
          )}
          {searchQuery.length === 0 && (
            <FlatList
              data={latestProducts}
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              renderItem={({item}) => {
                const image = item && item.thumbnail;
                return (
                  <View
                    style={{
                      flex: 1,
                      paddingHorizontal: 8,
                      flexDirection: 'row',
                      borderWidth: 1,
                      borderColor: '#F1EFEF',
                      borderRadius: 6,
                      margin: 4,
                      alignItems: 'center',
                    }}>
                    <Text style={styles.item}>{item.title}</Text>
                    <Image
                      source={{uri: image}}
                      style={{
                        height: 24,
                        width: 24,
                        marginLeft: 8,
                      }}
                    />
                  </View>
                );
              }}
            />
          )}
        </>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  item: {
    fontWeight: '500',
    color: '#2A2A2A',
    fontSize: 12,
  },
  detailContainer: {
    flexDirection: 'row',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F1EFEF',
    marginHorizontal: 12,
    marginBottom: 8,
  },
  productImage: {
    width: 68,
    height: 68,
    backgroundColor: 'white',
    borderRadius: 6,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#2A2A2A',
  },
  firstView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: '700',
    fontSize: 16,
    color: '#2A2A2A',
  },
  secondView: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 4,
    marginTop: 20,
  },
  addButtonText: {
    color: '#80B918',
    fontWeight: 'bold',
  },
});
