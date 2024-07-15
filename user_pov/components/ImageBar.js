import React from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';

const ImageBar = () => {
  const images = [
    { id: 1, source: require('../assets/Homescreen_assets/pic1.png') },
    { id: 2, source: require('../assets/Homescreen_assets/pic2.png') },
    { id: 3, source: require('../assets/Homescreen_assets/pic3.png') },
    { id: 4, source: require('../assets/Homescreen_assets/pic4.png') },
    { id: 5, source: require('../assets/Homescreen_assets/pic5.png') },

  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {images.map((image) => (
          <View key={image.id} style={styles.imageContainer}>
            <Image source={image.source} style={styles.image} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 80,
    height: 110,
  },
});


export default ImageBar;
