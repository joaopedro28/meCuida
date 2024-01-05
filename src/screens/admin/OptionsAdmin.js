import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import { useUser } from '../../composables/UserContext';
import useAppWrite from '../../composables/useAppWrite';
import { Databases } from 'appwrite';

function OptionsAdmin() {
    const { clearGlobalUserId, userId } = useUser();
    const appwrite = useAppWrite();
    const database = new Databases(appwrite);
    const navigation = useNavigation();

    const [openEditProfile, setOpenEditProfile] = useState(false);
    const [specialty, setSpecialty] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');
    const [admin, setAdmin] = useState(true);
    const [name, setName] = useState('');
    const [user, setUser] = useState('');
    const [cpf, setCpf] = useState('');

    const handleLogout = () => {
        clearGlobalUserId();
        navigation.dispatch(StackActions.replace('Login'));
    };

    const handleEditHealthProfile = async () => {
        try {
            // Coloque aqui a lógica para buscar os dados atuais do perfil do administrador
            // Certifique-se de preencher os estados (specialty, documentType, etc.) com os dados atuais antes de exibir o modal

            setOpenEditProfile(true);
        } catch (error) {
            console.error('Erro ao obter perfil do administrador:', error);
        }
    };

    const updateAdminProfile = async () => {
        try {
            // Atualiza o documento do administrador com as novas informações
            const response = await database.getDocument('657b4065cd96d233005a', '657b40ffead20fadf40e', userId);
            setSpecialty(specialty || response.specialty);
            setDocumentType(documentType || response.documentType);
            setDocumentNumber(documentNumber || response.documentNumber);
            setName(name || response.name);
            setUser(user || response.user);
            setCpf(cpf || response.cpf);

            await database.updateDocument('657b4065cd96d233005a', '657b40ffead20fadf40e', userId, {
                specialty: specialty,
                documentType: documentType,
                documentNumber: documentNumber,
                admin: admin,
                name: name,
                user: user,
                cpf: cpf,
            });

            setOpenEditProfile(false);
            alert('Perfil atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar perfil do administrador:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleEditHealthProfile} style={styles.button}>
                <Text style={styles.buttonText}>Editar Meu Perfil</Text>
            </TouchableOpacity>

            <Modal visible={openEditProfile} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.titleModal}>Editar Perfil do Administrador</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Especialidade"
                            value={specialty}
                            onChangeText={(text) => setSpecialty(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Tipo de Documento"
                            value={documentType}
                            onChangeText={(text) => setDocumentType(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Número do Documento"
                            value={documentNumber}
                            onChangeText={(text) => setDocumentNumber(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Nome"
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Usuário"
                            value={user}
                            onChangeText={(text) => setUser(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="CPF"
                            value={cpf}
                            onChangeText={(text) => setCpf(text)}
                        />


                        <TouchableOpacity onPress={updateAdminProfile} style={styles.button}>
                            <Text style={styles.buttonText}>Salvar Alterações</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setOpenEditProfile(false)}  style={styles.closeModal} >
                            <Text style={styles.buttonText}>x</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity onPress={handleLogout} style={styles.button}>
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 16,
        textAlign: 'left',
    },
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
    titleModal: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 8,
    },
    label: {
        fontSize: 16,
        marginBottom: 4,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 6,
        padding: 8,
    },
    closeModal: {
        position: 'absolute',
        top: 10,
        right: 10,
        color: '#fff',
        borderRadius: 30,
        fontSize: 12,
        backgroundColor: '#fd0000',
        zIndex: 2
    },
});

export default OptionsAdmin;
