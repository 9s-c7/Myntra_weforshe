import React, { useState, useEffect, useRef } from 'react';
import { Animated, ImageBackground, StyleSheet, Text, View, Modal, Image, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";
import axios from 'axios';
import Back from "../components/Back.js";
import Streak from "../components/Streak.js";
import Feature from "../components/Feature.js";
import Description from "../components/Description.js";
import Notification from "../components/Notification.js";
import Comment from "../components/Comment.js";
import Company from "../components/Company.js";
import Follow from "../components/Follow.js";
import { useNavigation } from '@react-navigation/native';
import CommentSection from '../components/CommentSection.js';


const HOST = '192.168.1.3';
const PORT = 3000;

function InfiniteScroll() {
    const navigation = useNavigation();
    const [tintColor, setTintColor] = useState(null);
    const opacity = useRef(new Animated.Value(0)).current;
    const [items, setItems] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const imageUrl = items.length > 0 ? `http://${HOST}:${PORT}${items[currentIndex].imageUrl}` : null;
    const company = items.length > 0 ? `${items[currentIndex].name}` : null;
    const description = items.length > 0 ? `${items[currentIndex].description}` : null;

    useEffect(() => {
        fetchItems();
    }, []);

    useEffect(() => {
        if (items.length > 0) {
            fetchComments(items[currentIndex]._id);
        }
    }, [currentIndex, items]);

    const fetchItems = async () => {
        try {
            const response = await axios.get(`http://${HOST}:${PORT}/items?approval=1`);
            setItems(response.data);
            if (response.data.length > 0) {
                fetchComments(response.data[0]._id); // Fetch comments for the first image
            }
        } catch (error) {
            console.error('Error fetching items:', error.message);
        }
    };

    const fetchComments = async (itemId) => {
        try {
            const response = await axios.get(`http://${HOST}:${PORT}/items/${itemId}/comments`);
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error.message);
        }
    };

    const handleSwipe = () => {
        if (currentIndex < items.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleCommentButtonPress = () => {
        setIsModalVisible(true);
    };

    const addComment = async () => {
        if (!newComment.trim()) {
            return;
        }

        try {
            const response = await axios.post(`http://${HOST}:${PORT}/items/${items[currentIndex]._id}/comments`, { comment: newComment });
            setComments([...comments, response.data]);
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error.message);
        }
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        if (tintColor) {
            Animated.timing(opacity, {
                toValue: 0.2,
                duration: 200,
                useNativeDriver: true,
            }).start(() => {
                setTimeout(() => {
                    Animated.timing(opacity, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: true,
                    }).start(() => setTintColor(null));
                }, 2000);
            });
        }
    }, [tintColor]);

    const triggerTintEffect = (color) => {
        setTintColor(color);
    };

    return (
        <ImageBackground style={styles.screen}>
            {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
            {tintColor && <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: tintColor, opacity }]} />}
            <View style={styles.upper}>
                <View style={styles.topview}>
                    <Back onPress={() => navigation.goBack()} />
                    <Streak />
                </View>
                <TouchableOpacity style={styles.bottomview} onPress={handleSwipe} activeOpacity={1}>
                    <Notification onPress={() => console.log('Notify User')} />
                    <Comment onPress={handleCommentButtonPress} />
                    <View style={styles.companyview}>
                        <Follow onPress={() => console.log('Clicked Follow Button')} />
                        <Company onPress={() => navigation.navigate('CompanyPage')} company={company} />
                    </View>
                    <Description desc={description} />
                </TouchableOpacity>
            </View>
            <Feature style={styles.feature} triggerTintEffect={triggerTintEffect} items={items} currentIndex={currentIndex} />
            {isModalVisible && (
                <CommentSection
                    comments={comments}
                    newComment={newComment}
                    setNewComment={setNewComment}
                    addComment={addComment}
                    onClose={closeModal}
                />
            )}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    upper: {
        backgroundColor: 'transparent',
        flex: 1,
        padding: 24,
    },
    topview: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bottomview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        gap: 15,
    },
    companyview: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    feature: {
        position: 'absolute',
        bottom: 0,
    },
});

export default InfiniteScroll;
