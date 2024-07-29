import { BlurView } from "expo-blur";
import { View, Image, Text, StyleSheet } from "react-native";

function Streak() {
    return (
        <BlurView intensity={60} tint="dark" style={styles.placeholder} >
            <Text style={styles.text}>64</Text>
            <Image source={require('../assets/Infinite_scroll_assets/streak.png')} style={styles.buttonImage} />
        </BlurView>
    );
}

const styles = StyleSheet.create({
    placeholder: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        borderRadius: 100,
        width: 76,
        height: 36,
        paddingHorizontal: 15,
        paddingVertical: 2,
        overflow: 'hidden'
    },
    text: {
        fontSize: 20,
        color: 'rgba(255, 255, 255, 0.6)',
        fontWeight: '500',
    },
    buttonImage: {
        width: 16,
        height: 20,
    }
});

export default Streak;
