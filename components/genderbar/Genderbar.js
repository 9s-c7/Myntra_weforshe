import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Genderbar = () => {
  const [activeButton, setActiveButton] = useState('Female'); 

  const handleButtonPress = (buttonType) => {
    setActiveButton(buttonType);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            activeButton === 'Men' ? styles.activeButton : styles.inactiveButton,
          ]}
          onPress={() => handleButtonPress('Men')}
        >
          <View style={styles.buttonContent}>
            <Image
              source={require('../../assets/men.png')} 
              style={styles.buttonImage}
            />
            <Text style={[styles.buttonText, activeButton === 'Men' ? styles.activeText : styles.inactiveText]}>Men</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            activeButton === 'Female' ? styles.activeButton : styles.inactiveButton,
          ]}
          onPress={() => handleButtonPress('Female')}
        >
          <View style={styles.buttonContent}>
            <Image
              source={require('../../assets/female3.png')} 
              style={styles.buttonImage}
            />
            <Text style={[styles.buttonText, activeButton === 'Female' ? styles.activeText : styles.inactiveText]}>Women</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', 
    maxWidth: 300, 
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row', 
    marginHorizontal: 5, 
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 10, 
  },
  buttonImage: {
    width: 20,
    height: 20,
    marginRight: 5, 
  },
  activeButton: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  inactiveButton: {
    backgroundColor: '#fff',
  },
  activeText: {
    color: '#fff',
  },
  inactiveText: {
    color: '#000',
  },
});

export default Genderbar;
