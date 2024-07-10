import React from 'react';
import { StyleSheet, View } from 'react-native';
import Homescreen from "../screens/Homescreen";
import Topbar from "../components/topbar/topbar";
import Navbar from "../components/navbar/navbar";
import Genderbar from '../components/genderbar/Genderbar';
import ImageBar from '../components/imagebar/ImageBar';

export default function Page() {
  return (
    <View style={styles.container}>
      <Topbar />
      <Homescreen/>
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection:'column',
    gap:2,
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  navbarContainer: {
    position: 'absolute',
    bottom: -35,
    width: '100%',
  },
});
