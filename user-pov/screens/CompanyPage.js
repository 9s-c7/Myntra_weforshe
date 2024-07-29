import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { TouchableOpacity } from "react-native";

const initialProducts = [
    {
        id: 1,
        title: 'Oversized Casual Shirt',
        description: '7Shores',
        price: '₹595',
        discount: '₹2799 (Rs. 2204 OFF)',
        image: require('../assets/company_assets/product10.jpg'),
    },
    {
        id: 2,
        title: 'Striped Opaque Casual Shirt',
        description: '7Shores',
        price: '₹659',
        discount: '₹1249 (Rs. 590 OFF)',
        image: require('../assets/company_assets/cl1.jpg'),
    },
    // Add more initial products as needed
];

const categories = [
    { id: 1, name: 'Men', image: require('../assets/company_assets/men1.jpg') },
    { id: 2, name: 'Women', image: require('../assets/company_assets/women1.jpg') },
    { id: 3, name: 'Footwear', image: require('../assets/company_assets/footwear1.jpg') },
    { id: 4, name: 'Accessories', image: require('../assets/company_assets/watch1.jpg') },
];

const CompanyPage = ({ onBackPress }) => {
    const [products, setProducts] = useState(initialProducts);
    const [isFollowing, setIsFollowing] = useState(true);

    const fetchMoreProducts = () => {
        // Simulate fetching more products
        const newProducts = [
            {
                id: products.length + 1,
                title: `evening gown`,
                description: '7Shores',
                price: `₹${500 + products.length * 10}`,
                discount: `₹${2000 + products.length * 10} (Rs. 1500 OFF)`,
                image: require('../assets/company_assets/product11.jpg'), // Reuse the same image for simplicity
            },
            {
                id: products.length + 2,
                title: `Formal Shirt`,
                description: '7Shores',
                price: `₹${500 + products.length * 10}`,
                discount: `₹${2000 + products.length * 10} (Rs. 1500 OFF)`,
                image: require('../assets/company_assets/product12.jpg'), // Reuse the same image for simplicity
            },
            {
                id: products.length + 3,
                title: `Shirt with a Twist`,
                description: '7Shores',
                price: `₹${500 + products.length * 10}`,
                discount: `₹${2000 + products.length * 10} (Rs. 1500 OFF)`,
                image: require('../assets/company_assets/product13.jpg'), // Reuse the same image for simplicity
            },
            // Add more products as needed
        ];
        setProducts([...products, ...newProducts]);
    };

    const renderHeader = () => (
        <View>
            <View style={styles.profileSection}>
                <Image style={styles.profileImage} source={require('../assets/company_assets/profile1.jpg')} />
                <View style={styles.profileText}>
                    <Text style={styles.profileName}>Roadster</Text>
                    <Text style={styles.profileFollowers}>236.0k Followers</Text>
                </View>
                <TouchableOpacity
                    style={[styles.followButton, isFollowing && styles.followingButton]}
                    onPress={() => setIsFollowing(!isFollowing)}
                >
                    <Text style={[styles.followButtonText, isFollowing && styles.followingButtonText]}>
                        {isFollowing ? 'Following' : '+Follow'}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.banner}>
                <Image style={styles.bannerImage} source={require('../assets/company_assets/banner1.jpg')} />
                <View style={styles.bannerOverlay}>
                    <Text style={styles.bannerTitle}>Roadster</Text>
                    <Text style={styles.bannerSubtitle}>New Style Drops, Every Month</Text>
                    <Text style={styles.bannerPrice}>Starting ₹299</Text>
                    <TouchableOpacity style={styles.exploreButton}>
                        <Text style={styles.exploreButtonText}>Explore</Text>
                    </TouchableOpacity>
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 6,
        backgroundColor: '#fff',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    profileText: {
        flex: 1,
        marginLeft: 16,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    profileFollowers: {
        fontSize: 14,
        color: '#888',
    },
    followButton: {
        backgroundColor: '#ff3e6c',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    followingButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ff3e6c',
    },
    followButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    followingButtonText: {
        color: '#ff3e6c',
    },
    categoryList: {
        paddingVertical: 16,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
    },
    category: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingHorizontal: 10,
    },
    categoryImageContainer: {
        backgroundColor: '#d3d3d3', // Grey background color
        width: 60, // Adjust size as needed
        height: 60, // Adjust size as needed
        borderRadius: 10, // Optional: if you want rounded corners for the background
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryImage: {
        width: 80,
        height: 70,
        borderRadius: 10,
    },
    categoryText: {
        marginTop: 8,
        fontSize: 14,
        color: '#333',
    },
    banner: {
        position: 'relative',
        height: 200,
        marginVertical: 16,
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    bannerOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10,
    },
    bannerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    bannerSubtitle: {
        fontSize: 16,
        color: '#fff',
        marginTop: 4,
    },
    bannerPrice: {
        fontSize: 18,
        color: '#fff',
        marginTop: 8,
    },
    exploreButton: {
        marginTop: 12,
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    exploreButtonText: {
        color: '#ff3e6c',
        fontWeight: 'bold',
    },
    productList: {
        padding: 16,
    },
    product: {
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 16,
        backgroundColor: '#fff',
    },
    productImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
    },
    productDescription: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
    },
    productDiscount: {
        fontSize: 14,
        color: 'red',
        marginTop: 4,
    },
});

export default CompanyPage;