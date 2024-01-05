import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';

import useAppWrite from '../../composables/useAppWrite';
import { Databases } from 'appwrite';
import { useUser } from '../../composables/UserContext';

const HomeAdmin = () => {
    const navigation = useNavigation();

    const handleCreateUser = () => {
        // Navegar para a aba 'CreateUser'
        navigation.navigate('CreateUser');
    };

    const handleCreateAppointment = () => {
        // Navegar para a aba 'CreateAppointment'
        navigation.navigate('CreateAppointment');
    };

    const handleCreateHealthProfile = () => {
        // Navegar para a aba 'CreateHealthProfile'
        navigation.navigate('CreateHealthProfile');
    }
    const { userId } = useUser();
    const [userName, setUserName] = useState('');
    const appwrite = useAppWrite();
    const database = new Databases(appwrite);

    const loadAdminUser = async () => {
        try {
            const response = await database.getDocument('657b4065cd96d233005a', '657b40ffead20fadf40e', userId);
            setUserName(response.name);
        } catch (error) {
        }
    };

    useEffect(() => {
        loadAdminUser();
    })
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo, Administrador {userName}!</Text>
            <Text style={styles.subtitle}>O que você gostaria de fazer?</Text>

            <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
                <Text style={styles.buttonText}>Criar Usuário</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleCreateAppointment}>
                <Text style={styles.buttonText}>Criar Consulta</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleCreateHealthProfile}>
                <Text style={styles.buttonText}>Criar Perfil de Profissional da Saúde</Text>
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
        paddingVertical: 16,
        paddingHorizontal: 2,
        borderRadius: 8,
        marginTop: 16,
        width: '85%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default HomeAdmin;
