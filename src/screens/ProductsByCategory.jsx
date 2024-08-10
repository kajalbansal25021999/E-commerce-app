import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SearchBar from '../components/SearchBar';

const {width} = Dimensions.get('window');

const ProductsByCategory = ({route}) => {
  const [items, setItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
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

  const handleProductPress = product => {
    setSelectedProduct(product);
  };

  const FixedSearchHeader = () => {
    return <SearchBar category={category} />;
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View>
        <FlatList
          data={items && items.products}
          keyExtractor={item => item.id.toString()}
          ListHeaderComponent={FixedSearchHeader}
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{height: 20}} />}
          renderItem={({item}) => {
            const image = item && item.thumbnail;
            return (
              <TouchableOpacity
                onPress={() => handleProductPress(item)}
                style={{
                  maxWidth: (width - 30) / 4,
                  flex: 1,
                  alignItems: 'center',
                  marginHorizontal: 12,
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
              </TouchableOpacity>
            );
          }}
          numColumns={4}
        />
      </View>
      <View style={{flex: 1, marginVertical: 40}}>
        {selectedProduct && (
          <View style={styles.detailContainer}>
            <View style={styles.firstView}>
              <Text style={styles.productTitle}>{selectedProduct.title}</Text>
              <View style={styles.nameContainer}>
                <Text style={styles.name}>{selectedProduct.weight}0g</Text>
                <Text style={styles.name}>{selectedProduct.price}</Text>
              </View>
            </View>
            <View style={styles.secondView}>
              <Image
                source={{uri: selectedProduct.thumbnail}}
                style={styles.productImage}
              />
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ProductsByCategory;

const styles = StyleSheet.create({
  item: {
    fontWeight: '500',
    marginTop: 4,
    color: '#2A2A2A',
    textAlign: 'center',
    fontSize: 10,
  },
  detailContainer: {
    flexDirection: 'row',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F1EFEF',
    marginHorizontal: 12,
    marginBottom: 8,
  },
  firstView: {
    flex: 1,
    justifyContent: 'space-between',
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
