import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useUser } from '../composables/UserContext';
import useAppWrite from '../composables/useAppWrite';
import { Databases, ID } from 'appwrite';

const Appointments = () => {
    const { userId } = useUser();
    const [consultas, setConsultas] = useState([]);

    const appwrite = useAppWrite();
    const database = new Databases(appwrite);

    const loadConsultas = async () => {
        try {
            const response = await database.listDocuments('657b4065cd96d233005a', '658eb9f30643c49a2832');
            const consultasdoUsuario = response.documents.filter(
                (consulta) => consulta && consulta.profile && consulta.profile.$id === userId
            );
            setConsultas(consultasdoUsuario);
        } catch (error) {
            console.error('Erro ao carregar as consultas', error);
        }
    };

    useEffect(() => {
        loadConsultas();
    }, [userId]);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Consultas</Text>
            {consultas.length > 0 ? (
                <FlatList
                    data={consultas}
                    keyExtractor={(item) => item.$id}
                    renderItem={({ item }) => (
                        <View style={styles.consultaItem}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text>{item.notes}</Text>
                            <Text style={styles.date}>Data: {item.date}</Text>
                            <Text style={styles.date}>Profissional Responsavel: {item.healthProfile?.name}</Text>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noConsultas}>Não há consultas disponíveis.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    date: {
        color: '#888',
        fontSize: 12,
        marginTop: 8,
    },
    consultaItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 8,
    },
    noConsultas: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default Appointments;
