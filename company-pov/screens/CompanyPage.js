import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
import styles from './CompanyPageStyles.js'; // Assuming you have styles defined here

const productImages = [
  require('../assets/db1.jpg'),
  require('../assets/db2.jpg'),
  require('../assets/db3.jpg'),
  require('../assets/db4.jpg'),
  require('../assets/db5.jpg'),
];

const initialProducts = [
  {
    id: 1,
    title: 'Classic Casual Shirt',
    description: '7Shores',
    price: '₹595',
    discount: '₹2799 (Rs. 2204 OFF)',
    image: require('../assets/product1.jpg'),
  },
  {
    id: 2,
    title: 'Linen Solid Color Long Sleeve Drawstring Waist Shirt',
    description: '7Shores',
    price: '₹659',
    discount: '₹1249 (Rs. 590 OFF)',
    image: require('../assets/product2.jpg'),
  },
];

const categories = [
  { id: 1, name: 'Men', image: require('../assets/men.jpg') },
  { id: 2, name: 'Women', image: require('../assets/women.jpg') },
  { id: 3, name: 'Footwear', image: require('../assets/footwear.jpg') },
  { id: 4, name: 'Accessories', image: require('../assets/watch.jpg') },
];

const CustomHeader = ({ onBackPress }) => (
  <View style={styles.headerContainer}>
    <StatusBar barStyle="dark-content" />
    <View style={styles.header}>
      <TouchableOpacity onPress={onBackPress}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.headerCenter}>
        <Image style={styles.headerImage} source={require('../assets/logo.jpg')} />
        <Text style={styles.headerTitle}>TheVintageStore</Text>
      </View>
      <View style={styles.headerIcons}>
        <Icon name="search" size={24} color="#000" style={styles.headerIcon} />
        <Icon name="favorite-border" size={24} color="#000" style={styles.headerIcon} />
        <Icon name="shopping-cart" size={24} color="#000" style={styles.headerIcon} />
      </View>
    </View>
  </View>
);

const CompanyPage = () => {
  const [products, setProducts] = useState(initialProducts);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const fetchMoreProducts = () => {
    const newProducts = Array.from({ length: 6 }).map((_, index) => ({
      id: Date.now() + index,
      title: `Product ${products.length + index + 1}`,
      description: '7Shores',
      price: `₹${500 + (products.length + index) * 10}`,
      discount: `₹${2000 + (products.length + index) * 10} (Rs. 1500 OFF)`,
      image: productImages[index % productImages.length],
    }));
    setProducts([...products, ...newProducts]);
  };

  const handleBackPress = () => {
    console.log('Back button pressed');
  };

  const renderHeader = () => (
    <View>
      <View style={styles.profileSection}>
        <Image style={styles.profileImage} source={require('../assets/logotvs.jpg')} />
        <View style={styles.profileText}>
          <Text style={styles.profileName}>TheVintageStore</Text>
          <Text style={styles.profileFollowers}>236.0k Followers</Text>
        </View>
      </View>
      <View style={styles.banner}>
        <Image style={styles.bannerImage} source={require('../assets/banner.jpg')} />
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerTitle}>TheVintageStore</Text>
        </View>
      </View>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.category}>
            <View style={styles.categoryImageContainer}>
              <Image style={styles.categoryImage} source={item.image} />
            </View>
            <Text style={styles.categoryText}>{item.name}</Text>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader onBackPress={handleBackPress} />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image style={styles.productImage} source={item.image} />
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
            <Text style={styles.productDiscount}>{item.discount}</Text>
          </View>
        )}
        onEndReached={fetchMoreProducts}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.productList}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Image source={require('../assets/trendify.png')} style={styles.fabImage} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CompanyPage;
