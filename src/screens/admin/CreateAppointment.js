import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import useAppWrite from '../../composables/useAppWrite';
import { Databases, ID } from 'appwrite';

const CreateAppointment = () => {
    const appwrite = useAppWrite();
    const database = new Databases(appwrite);

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');
    const [selectedProfile, setSelectedProfile] = useState('');
    const [selectedHealthProfile, setSelectedHealthProfile] = useState('');
    const [profiles, setProfiles] = useState([]);
    const [healthProfiles, setHealthProfiles] = useState([]);


    useEffect(() => {
        // Realize um GET para obter os perfis
        const getProfiles = async () => {
            try {
                const response = await database.listDocuments('657b4065cd96d233005a', '657b4073116903a3a9ac');
                setProfiles(response.documents);
            } catch (error) {
                console.error('Erro ao obter perfis:', error);
            }
        };

        getProfiles();

        const getHealthProfiles = async () => {
            try {
                const response = await database.listDocuments('657b4065cd96d233005a', '657b40ffead20fadf40e');
                setHealthProfiles(response.documents);
            } catch (error) {
                console.error('Erro ao obter perfis de profissionais da saúde:', error);
            }
        };

        getHealthProfiles();
        getProfiles();
    }, []);

    const handleRegister = async () => {
        try {
            const data = {
                title: title,
                date: date,
                notes: notes,
                profile: selectedProfile,
                healthProfile: selectedProfile
            };

            const response = await database.createDocument(
                '657b4065cd96d233005a', // Substitua pelo ID do seu banco de dados
                '658eb9f30643c49a2832', // Substitua pelo ID da sua coleção de consultas
                ID.unique(),
                data
            );
            alert('Cadastro de consulta realizado com sucesso!');
        } catch (error) {
            console.error('Erro durante o cadastro de consulta:', error);
            alert('Erro durante o cadastro de consulta. Verifique os dados e tente novamente.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Cadastro de Consulta</Text>
            <TextInput
                placeholder="Título da Consulta"
                style={styles.input}
                value={title}
                onChangeText={(text) => setTitle(text)}
            />
            <TextInput
                placeholder="Data da Consulta"
                style={styles.input}
                value={date}
                onChangeText={(text) => setDate(text)}
            />
            <TextInput
                placeholder="Observações"
                style={styles.input}
                value={notes}
                onChangeText={(text) => setNotes(text)}
            />
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedProfile}
                    onValueChange={(itemValue) => setSelectedProfile(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Selecione um Perfil" style={styles.label} value="" />
                    {profiles.map((profile) => (
                        <Picker.Item key={profile.$id} label={profile.name} style={styles.label}  value={profile.$id} />
                    ))}
                </Picker>
            </View>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedHealthProfile}
                    onValueChange={(itemValue) => setSelectedHealthProfile(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Selecione um Profissional da Saúde" style={styles.label} value="" />
                    {healthProfiles.map((health_profile) => (
                        <Picker.Item key={health_profile.$id} label={health_profile.name} style={styles.label}  value={health_profile.$id} />
                    ))}
                </Picker>
            </View>
            <Button
                title="Cadastrar Consulta"
                onPress={handleRegister}
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
    pickerContainer: {
        height: 50,
        borderColor: '#000',
        borderWidth: 1,
        backgroundColor: '#fff',
        borderRadius: 16,
        margin: 10,
        width: 240,
        color: '#000',
    },
    label: {
        fontSize: 16,
        marginBottom: 4,
        width: 240,
    },
    picker: {
        width: 240,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        paddingHorizontal: 10,
        color: '#000',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 16,
        marginTop: 30,
    },
});

export default CreateAppointment;
