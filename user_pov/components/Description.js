import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Description = ({ desc }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {desc}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 48,
        overflow: 'hidden',
        width: '100%',
    },
    text: {
        textAlign: 'left',
        fontSize: 14,
        color: 'white'
    },
});

export default Description;
