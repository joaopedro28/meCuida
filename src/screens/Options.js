import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

function OptionsPage() {
    return (
        <View >
            
                <Text style={styles.title}>Página de Opções</Text>
            
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 16,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
});

export default OptionsPage;
