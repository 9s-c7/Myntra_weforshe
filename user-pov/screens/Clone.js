import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Homescreen from "./Homescreen";
import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";

function Clone() {
    return (
        <View style={styles.container}>
            <Topbar />
            <Homescreen />
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    navbarContainer: {
        position: 'absolute',
        bottom: -35,
        width: '100%',
    },
});

export default Clone;
