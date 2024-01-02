import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

const HomeAdmin = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo, Administrador!</Text>
            <Text style={styles.subtitle}>O que você gostaria de fazer?</Text>

            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText}>Cadastrar Consulta</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText}>Gerenciar Usuários</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText}>Gerenciar Profissionais da Saúde</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText}>Opções</Text>
            </TouchableOpacity>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#2b47e5',
        padding: 16,
        borderRadius: 8,
        marginTop: 16,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default HomeAdmin;
