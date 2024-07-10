import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

const Fashionscreen = () => {
    const [activeButton, setActiveButton] = useState('button1');

  const handleButtonPress = (buttonType) => {
    setActiveButton(buttonType);
  };

  return (
    <ScrollView vertical style={styles.container}>
        <View style={styles.imageContainer}>
            <Image
            source={require('/Users/Sonal/Myntra/Myntra/assets/model.png')}
            style={styles.image}
            resizeMode="cover"
            />
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            activeButton === 'button1' ? styles.activeButton : null,
          ]}
          onPress={() => handleButtonPress('button1')}
        >
          <Text style={[styles.buttonText, activeButton === 'button1' ? styles.activeText : null]}>This Week</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            activeButton === 'button2' ? styles.activeButton : null,
          ]}
          onPress={() => handleButtonPress('button2')}
        >
          <Text style={[styles.buttonText, activeButton === 'button2' ? styles.activeText : null]}>Last Week</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            activeButton === 'button3' ? styles.activeButton : null,
          ]}
          onPress={() => handleButtonPress('button3')}
        >
          <Text style={[styles.buttonText, activeButton === 'button3' ? styles.activeText : null]}>ALL</Text>
        </TouchableOpacity>
      </View>

      {/* Grid Section */}
      <ScrollView horizontal style={styles.gridContainer}>
        <View style={styles.imageGrid}>
          <Image
            source={require('/Users/Sonal/Myntra/Myntra/assets/image1.png')}
            style={styles.gridImage}
            resizeMode="cover"
          />
          <Image
            source={require('/Users/Sonal/Myntra/Myntra/assets/image2.png')}
            style={styles.gridImage}
            resizeMode="cover"
          />
          <Image
            source={require('/Users/Sonal/Myntra/Myntra/assets/image3.png')}
            style={styles.gridImage}
            resizeMode="cover"
          />
          <Image
            source={require('/Users/Sonal/Myntra/Myntra/assets/image4.png')}
            style={styles.gridImage}
            resizeMode="cover"
          />
        </View>
      </ScrollView>
        </ScrollView>

  );
};

const styles = StyleSheet.create({

    container: {
        display:'flex',
        backgroundColor: '#dcf6ab',
      },
      imageContainer: {
        height: 300,

      },
      image: {
        flex: 1,
        width: '100%',
        height: '100%',
      },
      buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom:20,
      },
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderRadius: 25,
        borderColor: '#ccc', 
        backgroundColor: '#fff', 
      },
      buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
      },
      activeButton: {
        borderColor: '#f04c75', 
      },
      activeText: {
        color: '#f04c75', 
      },
      gridContainer: {
        paddingHorizontal: 15,
      },
      imageGrid: {
        flexDirection: 'row',
        gap:10,
        alignItems: 'center',
        marginBottom: 10,
      },
      gridImage: {
        width: '15%',
        aspectRatio: 1, 
        marginBottom: 10,
      },
});

export default Fashionscreen;
