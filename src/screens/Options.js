import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import { useUser } from '../composables/UserContext';

import useAppWrite from '../composables/useAppWrite';
import { Databases } from 'appwrite';

function OptionsPage() {
    const { clearGlobalUserId, userId } = useUser();
    const appwrite = useAppWrite();
    const database = new Databases(appwrite);

    const navigation = useNavigation();
    const [openEditProfile, setOpenEditProfile] = useState(false);
    const [currentName, setCurrentName] = useState('');
    const [currentCPF, setCurrentCPF] = useState('');
    const [currentUsername, setCurrentUsername] = useState('');
    const [newName, setNewName] = useState('');
    const [newCPF, setNewCPF] = useState('');
    const [newUsername, setNewUsername] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await database.getDocument('657b4065cd96d233005a', '657b4073116903a3a9ac', userId);
                setCurrentName(response.name || '');
                setCurrentCPF(response.cpf || '');
                setCurrentUsername(response.user || '');
            } catch (error) {
                console.error('Erro ao obter perfil do usuário:', error);
            }
        };

        if (openEditProfile) {
            fetchUserProfile();
        }
    }, [openEditProfile, userId, database]);

    const handleLogout = () => {
        clearGlobalUserId();
        navigation.dispatch(StackActions.replace('Login'));
    };

    const updateProfile = async () => {
        try {
            await database.updateDocument('657b4065cd96d233005a', '657b4073116903a3a9ac', userId, {
                name: newName,
                cpf: newCPF,
                user: newUsername,
            });

            setOpenEditProfile(false);
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setOpenEditProfile(!openEditProfile)} style={styles.button}>
                <Text style={styles.buttonText}>Editar Meu Perfil</Text>
            </TouchableOpacity>

            <Modal visible={openEditProfile} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.title}>Editar Perfil</Text>

                        <View style={styles.userDataContainer}>
                            <Text style={styles.label}>Nome Atual:</Text>
                            <Text style={styles.userData}>{currentName}</Text>

                            <Text style={styles.label}>CPF Atual:</Text>
                            <Text style={styles.userData}>{currentCPF}</Text>

                            <Text style={styles.label}>Usuário Atual:</Text>
                            <Text style={styles.userData}>{currentUsername}</Text>
                        </View>

                        <TextInput
                            style={styles.input}
                            placeholder="Novo Nome"
                            value={newName}
                            onChangeText={(text) => setNewName(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Novo CPF"
                            value={newCPF}
                            onChangeText={(text) => setNewCPF(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Novo Usuário"
                            value={newUsername}
                            onChangeText={(text) => setNewUsername(text)}
                        />

                        <TouchableOpacity onPress={updateProfile} style={styles.button}>
                            <Text style={styles.buttonText}>Salvar Alterações</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setOpenEditProfile(false)} style={styles.button}>
                            <Text style={styles.buttonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity onPress={handleLogout} style={styles.button}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'flex-start',
    },
    button: {
        backgroundColor: '#2b47e5',
        padding: 16,
        borderRadius: 8,
        marginTop: 16,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        width: '80%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    userDataContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    userData: {
        fontSize: 16,
        marginBottom: 12,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
        padding: 8,
    },
});

export default OptionsPage;
