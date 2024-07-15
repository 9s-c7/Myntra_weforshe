import { View, StyleSheet, ScrollView } from 'react-native';
import ImageBar from '../components/ImageBar';
import Genderbar from '../components/Genderbar';
import Fashionscreen from '../components/Fashionscreen';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.Barcontainer}>
          <Genderbar />
          <ImageBar />
        </View>
        <Fashionscreen />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  Barcontainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
  },
});

export default HomeScreen;
