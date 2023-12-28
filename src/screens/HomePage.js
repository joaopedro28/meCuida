import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useUser } from '../composables/UserContext';
function HomePage() {
    const { userId } = useUser();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Página Inicial {userId}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default HomePage;