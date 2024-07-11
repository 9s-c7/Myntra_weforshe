import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Navbar = () => {
  return (
    <View style={styles.bottomContainer}>
      <View style={styles.pinkBorder} />
      <View style={styles.navbar}>

      <View style={styles.iconsContainer}>
      
        <TouchableOpacity onPress={() => console.log('Myntra pressed')}>
          <Image
            source={require('../../assets/myntra.png')}
            style={styles.myntra}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Mini pressed')}>
          <Image
            source={require('../../assets/mini.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Trendify pressed')}>
          <Image
            source={require('../../assets/logo3.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Trends pressed')}>
          <Image
            source={require('../../assets/trends.png')}
            style={styles.trends}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Profile pressed')}>
          <Image
            source={require('../../assets/profile.png')}
            style={styles.profile}
          />
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height :82,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pinkBorder: {
    position: 'absolute',
    top:0,
    left :0,
    width: 85,
    borderTopWidth: 5,
    borderTopColor: '#f04c75',
  },
  navbar: {
    flexDirection: 'row',
  },
  iconsContainer: {
    display:'flex',
    flexDirection: 'row',
    justifyContent:'space-around',
    gap:'25',
  },
  logo:{
    height:55,
    width:63,
  },
  myntra:{
    width: 50,
    height: 73,
  },
  trends:{
    width: 50,
    height: 60,
  },
  profile:{
    width: 50,
    height: 63,
  },
  icon: {
    width: 50,
    height: 58,
  },
});

export default Navbar;
