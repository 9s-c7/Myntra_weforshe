import { Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";

function Back({ onPress }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Image source={require('../assets/Infinite_scroll_assets/backbutton.png')} style={styles.buttonImage} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 24,
        height: 24,
        backgroundColor: 'transparent',
    },
    buttonImage: {
        width: 24,
        height: 24,
    },
});

export default Back;
