import React, { useState, useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View, PanResponder, Text } from "react-native";
import axios from 'axios';


const HOST = '192.168.1.3';
const { width } = Dimensions.get('window');
const phoneNumber = '8765432109';

function Feature({ triggerTintEffect, items, currentIndex }) {
    const [winHeight] = useState(new Animated.Value(20));
    const [midHeight] = useState(new Animated.Value(20));
    const [loseHeight] = useState(new Animated.Value(20));

    // Use refs to keep stable references to items and currentIndex
    const itemsRef = useRef(items);
    const currentIndexRef = useRef(currentIndex);

    useEffect(() => {
        itemsRef.current = items;
        currentIndexRef.current = currentIndex;
    }, [items, currentIndex]);

    const sendSwipeAction = async (action) => {
        const items = itemsRef.current;
        const currentIndex = currentIndexRef.current;

        if (!Array.isArray(items) || items.length === 0) {
            return;
        }

        if (currentIndex < 0 || currentIndex >= items.length) {
            return;
        }

        const currentItem = items[currentIndex];
        if (!currentItem || !currentItem._id) {
            return;
        }

        try {
            const response = await axios.post(`http://${HOST}:3000/items/${currentItem._id}/swipe`, {
                action,
                phoneNumber,
            });
            console.log('Swipe action sent');
        } catch (error) {
            console.error('Error sending swipe action:', error.message);
        }
    };

    const createPanResponder = (height, resetHeights, originalHeight, color, action) => {
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
                    }).start();
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dy < 0) {
                    sendSwipeAction(action).then(() => {
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

    const winPanResponder = useRef(createPanResponder(winHeight, resetWinHeight, 20, "#F31CB1", "win")).current;
    const midPanResponder = useRef(createPanResponder(midHeight, resetMidHeight, 20, "#FF9130", "mid")).current;
    const losePanResponder = useRef(createPanResponder(loseHeight, resetLoseHeight, 20, "#F25512", "lose")).current;

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
