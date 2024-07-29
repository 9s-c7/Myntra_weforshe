import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from "react-native";

const { width } = Dimensions.get('window');
const iconsize = 45;

const Navbar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.bottomContainer}>
      <View style={styles.pinkBorder} />
      <View style={styles.iconsContainer}>
        <Image
          source={require('../assets/Homescreen_assets/fwd.png')}
          style={styles.myntra}
        />
        <Image
          source={require('../assets/Homescreen_assets/minis.png')}
          style={styles.icon}
        />
        <TouchableOpacity onPress={() => navigation.navigate('InfiniteScroll')}>
          <Image
            source={require('../assets/Homescreen_assets/trendify.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
        <Image
          source={require('../assets/Homescreen_assets/trends.png')}
          style={styles.trends}
        />
        <Image
          source={require('../assets/Homescreen_assets/profile.png')}
          style={styles.profile}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 85,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pinkBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width / 5,
    height: 4,
    backgroundColor: '#f04c75',
  },
  iconsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 25,
  },
  logo: {
    height: iconsize,
    width: iconsize,
  },
  myntra: {
    width: iconsize,
    height: iconsize,
  },
  trends: {
    width: iconsize,
    height: iconsize,
  },
  profile: {
    width: iconsize,
    height: iconsize,
  },
  icon: {
    width: iconsize,
    height: iconsize,
  },
});

export default Navbar;
