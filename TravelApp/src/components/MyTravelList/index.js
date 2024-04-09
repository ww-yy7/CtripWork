import { View, Text, StyleSheet, } from 'react-native';

export default function MyTravelList() {

    return (
        <View style={styles.container}>
            <Text>我的游记</Text>
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