import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { BlurView } from 'expo-blur';
import { TouchableOpacity } from "react-native";

function Follow({ onPress }) {
    const [isFollowing, setIsFollowing] = useState(false);

    const handlePress = () => {
        setIsFollowing(!isFollowing);
        if (onPress) {
            onPress();
        }
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <BlurView
                intensity={80}
                tint="dark"
                style={[styles.container, isFollowing ? styles.containerFollowing : styles.containerFollow]}
            >
                <Text style={styles.text}>{isFollowing ? 'Following' : 'Follow'}</Text>
            </BlurView>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        opacity: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        overflow: 'hidden'
    },
    containerFollow: {
        width: 72,
        height: 32,
    },
    containerFollowing: {
        width: 90,
        height: 32,
    },
    text: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '700',
    }
});

export default Follow;
