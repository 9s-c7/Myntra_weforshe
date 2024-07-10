// Header.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';

const Topbar = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.topBar}>
        <View style={styles.leftContainer}>
          <TouchableOpacity onPress={() => console.log('Forward pressed')}>
            <Image
              source={require('/Users/Sonal/Myntra/Myntra/assets/forward.png')} 
              style={styles.forwardicon}
            />
          </TouchableOpacity>
          <View style={styles.becomeInsider}>
            <Image
              source={require('/Users/Sonal/Myntra/Myntra/assets/crown.png')} 
              style={styles.icon}
            />
          </View>
          <View style={styles.becomeInsiderTextContainer}>
              <Text style={styles.becomeText}>BECOME</Text>
              <Text style={styles.insiderText}>INSIDER {'>'}</Text>
            </View>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity onPress={() => console.log('Notifications pressed')}>
            <Image
              source={require('/Users/Sonal/Myntra/Myntra/assets/notification.png')} 
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Heart pressed')}>
            <Image
              source={require('/Users/Sonal/Myntra/Myntra/assets/Heart.png')} 
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Bag pressed')}>
            <Image
              source={require('/Users/Sonal/Myntra/Myntra/assets/bag.png')} 
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.searchBar}>
        <Image
          source={require('/Users/Sonal/Myntra/Myntra/assets/search.png')} 
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search for Brands and Products"
          style={styles.searchInput}
        />
        <View style={styles.searchIconsRight}>
          <TouchableOpacity onPress={() => console.log('Camera pressed')}>
            <Image
              source={require('/Users/Sonal/Myntra/Myntra/assets/camera.png')} 
              style={styles.searchIconRight}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Mic pressed')}>
            <Image
              source={require('/Users/Sonal/Myntra/Myntra/assets/mic.png')} 
              style={styles.searchIconRight}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#fff',
    padding: 10,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  becomeInsider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  becomeInsiderTextContainer: {
    marginLeft: 5,
  },
  becomeText: {
    fontSize: 9,
    lineHeight: 12,
  },
  insiderText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'gold',
    lineHeight: 12,
  },
  forwardicon:{
    width: 80,
    height: 30,
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    marginTop: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#A9A9A9', 
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  searchIconsRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIconRight: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
});

export default Topbar;
