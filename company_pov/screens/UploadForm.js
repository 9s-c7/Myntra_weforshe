import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Platform, TouchableOpacity } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';

const UploadForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  const addItem = async () => {
    if (!image || !image.uri) {
      console.error('No image selected');
      Toast.show({
        type: 'error',
        text1: 'Image Upload Failed',
        text2: 'No image selected'
      });
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('keywords', keywords);
    formData.append('image', {
      uri: image.uri,
      name: image.uri.split('/').pop(),
      type: 'image/jpeg',
    });

    try {
      const response = await axios.post('http://localhost:8082/items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Image uploaded successfully! You will get a notification once Myntra Team approves your design.');
      setName('');
      setDescription('');
      setKeywords('');
      setImage(null);
      onClose();
      Toast.show({
        type: 'success',
        text1: 'Submission Successful',
        text2: 'You will get a notification once Myntra Teams Approves your Design.',
      });
    } catch (error) {
      console.error('Error uploading item:', error.response ? error.response.data : error.message);
      Toast.show({
        type: 'error',
        text1: 'Image Upload Failed',
        text2: error.response ? error.response.data : error.message
      });
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        if (result.assets && result.assets.length > 0) {
          setImage(result.assets[0]);
        } else {
          console.error('Image selection failed, result:', result);
        }
      } else {
        console.error('Image selection canceled');
      }
    } catch (error) {
      console.error('Error picking image:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upload New Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Keywords (comma-separated)"
        value={keywords}
        onChangeText={setKeywords}
      />
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>
      {image && image.uri && <Image source={{ uri: image.uri }} style={styles.imagePreview} />}
      <TouchableOpacity style={styles.button} onPress={addItem}>
        <Text style={styles.buttonText}>Add Item</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#F31CB1',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#FF9130',
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default UploadForm;
