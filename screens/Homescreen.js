import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { styles } from './Homestyles'; 
import ImageBar from '../components/imagebar/ImageBar';
import Genderbar from '../components/genderbar/Genderbar';
import Fashionscreen from '../components/fashionscreen/Fashionscreen';

const HomePage = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.Barcontainer}>
      <Genderbar />
      <ImageBar/>
      </View>
      <Fashionscreen/>
      </ScrollView>
    </View>
  );
};

export default HomePage;
