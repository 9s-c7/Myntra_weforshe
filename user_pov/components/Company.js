import { Image, StyleSheet, Text, View } from "react-native";

function Company({ onPress, company }) {
    return (
        <View>
            <Text style={styles.text} onPress={onPress}>
                {company}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: '700',
        color: 'white',
    }
});

export default Company;