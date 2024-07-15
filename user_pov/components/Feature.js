import React, { useState, useRef, useEffect } from 'react';
import { Animated, Dimensions, StyleSheet, View, PanResponder, Text } from "react-native";

const { width } = Dimensions.get('window');

function Feature({ triggerTintEffect }) {
    const [winHeight] = useState(new Animated.Value(20));
    const [midHeight] = useState(new Animated.Value(20));
    const [loseHeight] = useState(new Animated.Value(20));

    const createPanResponder = (height, resetHeights, originalHeight, color) => {
        return PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return Math.abs(gestureState.dy) > 10;
            },
            onPanResponderMove: (evt, gestureState) => {
                if (gestureState.dy < 0) {
                    Animated.timing(height, {
                        toValue: 48,
                        duration: 500,
                        useNativeDriver: false,
                    }).start(() => {
                        resetHeights();
                        triggerTintEffect(color);
                        setTimeout(() => {
                            Animated.timing(height, {
                                toValue: originalHeight,
                                duration: 500,
                                useNativeDriver: false,
                            }).start();
                        }, 2000);
                    });
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                // Handle the release of the gesture if needed
            },
        });
    };

    const resetWinHeight = () => {
        Animated.timing(midHeight, {
            toValue: 20,
            duration: 200,
            useNativeDriver: false,
        }).start();
        Animated.timing(loseHeight, {
            toValue: 20,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const resetMidHeight = () => {
        Animated.timing(winHeight, {
            toValue: 20,
            duration: 200,
            useNativeDriver: false,
        }).start();
        Animated.timing(loseHeight, {
            toValue: 20,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const resetLoseHeight = () => {
        Animated.timing(winHeight, {
            toValue: 20,
            duration: 200,
            useNativeDriver: false,
        }).start();
        Animated.timing(midHeight, {
            toValue: 20,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const winPanResponder = useRef(createPanResponder(winHeight, resetWinHeight, 20, "#F31CB1")).current;
    const midPanResponder = useRef(createPanResponder(midHeight, resetMidHeight, 20, "#FF9130")).current;
    const losePanResponder = useRef(createPanResponder(loseHeight, resetLoseHeight, 20, "#F25512")).current;

    return (
        <View style={styles.placeholder}>
            <Animated.View style={[styles.win, { height: winHeight }]} {...winPanResponder.panHandlers}>
                <Text style={styles.text}>W</Text>
            </Animated.View>
            <Animated.View style={[styles.mid, { height: midHeight }]} {...midPanResponder.panHandlers}>
                <Text style={styles.text}>mid</Text>
            </Animated.View>
            <Animated.View style={[styles.lose, { height: loseHeight }]} {...losePanResponder.panHandlers}>
                <Text style={styles.text}>L</Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    placeholder: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    win: {
        width: width / 3,
        backgroundColor: "#F31CB1",
        borderTopLeftRadius: 20,
        alignItems: 'center',
    },
    mid: {
        width: width / 3,
        backgroundColor: "#FF9130",
        alignItems: 'center',
    },
    lose: {
        width: width / 3,
        backgroundColor: "#F25512",
        borderTopRightRadius: 20,
        alignItems: 'center',
    },
    text: {
        color: 'rgba(255,255,255,0.5)',
        marginTop: 2
    }
});

export default Feature;
