import React from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Modal } from 'react-native';
import { TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const CommentSection = ({ comments, newComment, setNewComment, addComment, onClose }) => {
    return (
        <Modal
            visible={true}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.commentSection}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Ionicons name="close" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.header}>Comments</Text>
                    <FlatList
                        data={comments}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.comment}>
                                <Text style={styles.commentText}>{item}</Text>
                            </View>
                        )}
                    />
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={newComment}
                            onChangeText={setNewComment}
                            placeholder="Add a comment..."
                            placeholderTextColor="#888"
                        />
                        <TouchableOpacity style={styles.button} onPress={addComment}>
                            <Text style={styles.buttonText}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    commentSection: {
        width: '90%',
        height: '80%',
        backgroundColor: '#222',
        borderRadius: 20,
        padding: 20,
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    header: {
        fontSize: 20,
        color: 'white',
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: '800',
    },
    comment: {
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    commentText: {
        color: 'white',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    input: {
        flex: 1,
        borderColor: '#333',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        paddingLeft: 10,
        color: 'white',
    },
    button: {
        marginLeft: 10,
        padding: 10,
        backgroundColor: '#F31CB1',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
    },
});

export default CommentSection;
