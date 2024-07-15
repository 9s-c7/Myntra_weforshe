import { Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";

function Comment({ onPress }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Image source={require('../assets/Infinite_scroll_assets/comment.png')} style={styles.buttonImage} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 28,
        height: 28,
        backgroundColor: 'transparent',
    },
    buttonImage: {
        width: 28,
        height: 28,
    },
});

export default Comment