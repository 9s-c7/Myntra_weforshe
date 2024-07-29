import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from "react-native";
function Notification({ onPress }) {
    const [isPressed, setIsPressed] = useState(false);

    const handlePress = () => {
        setIsPressed(true);
        onPress();
        setTimeout(() => {
            setIsPressed(false);
        }, 1000);
    };

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={handlePress}
        >
            <Image
                source={require('../assets/Infinite_scroll_assets/notification.png')}
                style={[styles.buttonImage, isPressed && styles.buttonImagePressed]}
            />
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
    buttonImagePressed: {
        tintColor: '#3581B8',
    },
});

export default Notification;
