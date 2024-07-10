import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Navbar = () => {
  return (
    <View style={styles.bottomContainer}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => console.log('Myntra pressed')}>
          <Image
            source={require('/Users/Sonal/Myntra/Myntra/assets/myntra.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Mini pressed')}>
          <Image
            source={require('/Users/Sonal/Myntra/Myntra/assets/mini.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => console.log('Trendify pressed')}>
          <Image
            source={require('/Users/Sonal/Myntra/Myntra/assets/trendify.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Trends pressed')}>
          <Image
            source={require('/Users/Sonal/Myntra/Myntra/assets/trends.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Profile pressed')}>
          <Image
            source={require('/Users/Sonal/Myntra/Myntra/assets/profile.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navbar: {
    flexDirection: 'row',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
});

export default Navbar;
