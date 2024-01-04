import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useUser } from '../composables/UserContext';
import Accordion from '../components/Accordion';
import jsonData from '../../assets/json/diabetes.json';

import useAppWrite from '../composables/useAppWrite';
import { Databases } from 'appwrite';
import { useNavigation } from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function HomePage() {
    const { userId } = useUser();
    const [userName, setUserName] = useState('');
    const appwrite = useAppWrite();
    const database = new Databases(appwrite);

    const loadUser = async () => {
        try {
            const response = await database.getDocument('657b4065cd96d233005a', '657b4073116903a3a9ac', userId);
            setUserName(response.name);
        } catch (error) {
        }
    };

    useEffect(() => {
        loadUser();
    })

    const navigation = useNavigation();

    const handleLembretes = () => {
        navigation.navigate('Lembretes');
    };

    const handleRegisterButton = () => {
        navigation.navigate('RegisterActivities');
    };

    const handleAppointmens = () => {
        navigation.navigate('Consultas');
    }

    const data = jsonData.diabetes;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem Vindo {userName}!</Text>

            <Text style={styles.text}>Aqui você pode ir para algumas funcionalidades do aplicativo</Text>
            <View style={styles.viewButtons}>

            <TouchableOpacity style={styles.button} onPress={handleLembretes}>
                <MaterialCommunityIcons name="clock" size={24} color="white" />
                <Text style={styles.buttonText}>Criar Lembretes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleRegisterButton}>
                <MaterialCommunityIcons name="playlist-edit" size={24} color="white" />
                <Text style={styles.buttonText}>Registrar Atividades</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleAppointmens}>
                <MaterialCommunityIcons name="doctor" size={24} color="white" />
                <Text style={styles.buttonText}>Visulizar Consultas</Text>
            </TouchableOpacity>
            </View>


            <ScrollView>
                <Text style={styles.title}>Veja algumas dúvidas frequentes sobre Diabetes Melitus Tipo 2</Text>
                <Accordion data={data} listItemColor="#8ECDF1" bulletColor="#fff" toggleTextColor="#fff" contentColor="#fff" />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 16,
        textAlign: 'center',
    },
    viewButtons : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
        paddingHorizontal: 16,
    },
    button: {
        backgroundColor: '#2b47e5',
        paddingVertical: 16,
        paddingHorizontal: 2,
        borderRadius: 8,
        marginTop: 16,
        width: '30%',
        alignItems: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 14,
        marginTop: 5,
        paddingHorizontal: 5,
    },
});

export default HomePage;