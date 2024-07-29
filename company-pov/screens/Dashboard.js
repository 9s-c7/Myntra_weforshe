import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UploadForm from '../components/UploadForm';

const Dashboard = () => {
    const [items, setItems] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const HOST = '192.168.1.3';

    useEffect(() => {
        // Fetch data from the backend
        axios.get(`http://${HOST}:8082/items`)
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleModalClose = () => {
        setModalVisible(false);
        // Optionally, refresh the items after closing the modal
        axios.get(`http://${HOST}:8082/items`)
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const calculatePercentage = (part, total) => {
        if (total === 0) return 0;
        return (part / total) * 100;
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.heading}>Trendify Dashboard</Text>
                <View style={styles.dashboard}>
                    {items
                        .filter(item => item.name === "TheVintageStore" && item.completed === 0)

                        .map(item => {
                            const total = item.Win.length + item.Mid.length + item.Loser.length;
                            const winPercentage = calculatePercentage(item.Win.length, total);
                            const midPercentage = calculatePercentage(item.Mid.length, total);
                            const losePercentage = calculatePercentage(item.Loser.length, total);

                            return (
                                <View key={item._id} style={styles.card}>
                                    <Image
                                        source={{ uri: `http://${HOST}:8082${item.imageUrl}` }}
                                        style={styles.image}
                                    />
                                    <View style={styles.info}>
                                        <View style={styles.statContainer}>
                                            <Text style={styles.label}>W</Text>
                                            <View style={styles.progressBar}>
                                                <View style={[styles.progress, { width: `${winPercentage}%`, backgroundColor: '#F31CB1' }]} />
                                            </View>
                                            <Text style={[styles.progressText, { color: '#F31CB1' }]}>{winPercentage.toFixed(0)}%</Text>
                                        </View>
                                        <View style={styles.statContainer}>
                                            <Text style={styles.label}>M</Text>
                                            <View style={styles.progressBar}>
                                                <View style={[styles.progress, { width: `${midPercentage}%`, backgroundColor: '#FF9130' }]} />
                                            </View>
                                            <Text style={[styles.progressText, { color: '#FF9130' }]}>{midPercentage.toFixed(0)}%</Text>
                                        </View>
                                        <View style={styles.statContainer}>
                                            <Text style={styles.label}>L</Text>
                                            <View style={styles.progressBar}>
                                                <View style={[styles.progress, { width: `${losePercentage}%`, backgroundColor: '#F25512' }]} />
                                            </View>
                                            <Text style={[styles.progressText, { color: '#F25512' }]}>{losePercentage.toFixed(0)}%</Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        })}
                </View>
            </ScrollView>
            <TouchableOpacity
                style={styles.fab}
                onPress={() => setModalVisible(true)}
            >
                <Ionicons name="add" size={36} color="white" />
            </TouchableOpacity>
            {isModalVisible && (
                <View style={styles.overlay}>
                    <View style={styles.modalContainer}>
                        <UploadForm onClose={handleModalClose} />
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container: {
        alignItems: 'center',
    },
    heading: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 16,
    },
    dashboard: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 16,
        margin: 8,
        width: '45%',
        alignItems: 'center',
        elevation: 3,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 100,
        marginBottom: 8,
    },
    info: {
        width: '100%',
    },
    statContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    progressBar: {
        height: 10,
        flex: 1,
        backgroundColor: '#ddd',
        borderRadius: 5,
        marginRight: 8,
    },
    progress: {
        height: '100%',
        borderRadius: 5,
    },
    progressText: {
        fontSize: 10,
        fontWeight: 'bold',
        width: 24,
    },
    label: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
        marginRight: 8,
        width: 16,
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 60,
        height: 60,
        backgroundColor: '#F31CB1',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
    },
});

export default Dashboard;
