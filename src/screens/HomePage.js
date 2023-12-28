import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { useUser } from '../composables/UserContext';
import Accordion from '../components/Accordion';
import jsonData from '../../assets/json/diabetes.json';

import useAppWrite from '../composables/useAppWrite';
import { Databases } from 'appwrite';

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
            console.error('Erro ao carregar atividades', error);
        }
    };

    useEffect(() => {
        loadUser();
    })

    const data = jsonData.diabetes;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem Vindo {userName}!</Text>

            <Text style={styles.text}>Aqui você pode ir para algumas funcionalidades do aplicativo</Text>

            <ScrollView>
                <Text style={styles.title}>Veja algums dúvidas frequentes sobre Diabetes Melitus Tipo 2</Text>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 16,
        textAlign: 'center',
    },
});

export default HomePage;