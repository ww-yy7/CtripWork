import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function MyHome() {

    return (
        <View style={styles.container}>
            <Text>
                我的主页
            </Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#DFDFDf',
        borderRadius: 2,
        marginBottom: 14,
        padding: 8,
    },
})