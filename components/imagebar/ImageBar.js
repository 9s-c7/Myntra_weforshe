import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import { styles } from './Imagebarstyles';

const ImageBar = () => {
  const images = [
    { id: 1, source: require('../../assets/pic1.png') },
    { id: 2, source: require('../../assets/pic2.png') },
    { id: 3, source: require('../../assets/pic3.png') },
    { id: 4, source: require('../../assets/pic4.png') },
    { id: 5, source: require('../../assets/pic5.png') },
    
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

export default ImageBar;
