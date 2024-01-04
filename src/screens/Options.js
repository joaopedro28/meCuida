import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import { useUser } from '../composables/UserContext';

function OptionsPage() {
    const { clearGlobalUserId } = useUser();
    const navigation = useNavigation();
    const [openEditProfile, setOpenEditProfile] = useState(false);

    const handleLogout = () => {
        clearGlobalUserId();
        navigation.dispatch(StackActions.replace('Login'));
    };

    const handleEditProfile = () => {
        //Eidtar campos e mandar um post para editar o perfil
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setOpenEditProfile(!openEditProfile)} style={styles.button}>
                <Text style={styles.buttonText}>Editar Meu Perfil</Text>
            </TouchableOpacity>

            <Modal visible={openEditProfile}>
                <View style={styles.container}>
                    <Text style={styles.title}>Editar Perfil</Text>
                    <TouchableOpacity onPress={handleEditProfile} style={styles.button}>
                        <Text style={styles.buttonText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setOpenEditProfile(false)} style={styles.button}>
                        <Text style={styles.buttonText}>Fechar</Text>
                    </TouchableOpacity>
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
        textAlign: 'left', // Alinha o texto à esquerda
    },
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'flex-start', // Alinha os itens ao início (superior) do container
    },
    button: {
        backgroundColor: '#2b47e5',
        padding: 16,
        borderRadius: 8,
        marginTop: 16,
        width: '100%', // Ocupa 100% da largura
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'left', // Alinha o texto à esquerda
    },
});

export default OptionsPage;
