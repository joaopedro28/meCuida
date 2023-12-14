// LoginScreen.js
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

const LoginScreen = () => {

    const navigation = useNavigation();

    const handleLogin = () => {
        // Lógica de autenticação aqui

        // Navegue para a tela de Dashboard após o login bem-sucedido
        navigation.dispatch(StackActions.replace('Dashboard'));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Faça Login </Text>
            <TextInput
                placeholder="User"
                style={styles.input}
                placeholderTextColor="#000"
            />
            <TextInput
                placeholder="CPF"
                secureTextEntry
                style={styles.input}
                placeholderTextColor="#000"
            />
            <Button
                title="Login"
                onPress={() => handleLogin()}
                style={styles.button}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8ECDF1',
    },
    heading: {
        fontSize: 20,
        marginBottom: 20,
        color: '#000',
    },
    input: {
        height: 50,
        borderColor: '#000',
        borderWidth: 1,
        backgroundColor: '#fff',
        borderRadius: 16,
        margin: 10,
        padding: 15,
        width: 240,
        color: '#000',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 16,
        marginTop: 30,
    },
});

export default LoginScreen;
