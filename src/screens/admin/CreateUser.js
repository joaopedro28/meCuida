import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import useAppWrite from '../../composables/useAppWrite';
import { Databases, ID } from 'appwrite';

const CreateUser = () => {
    const appwrite = useAppWrite();
    const database = new Databases(appwrite);

    const [name, setName] = useState('');
    const [user, setUser] = useState('');
    const [cpf, setCpf] = useState('');

    const handleRegister = async () => {
        try {
            const data = {
                name: name,
                user: user,
                cpf: cpf,
            };

            const response = await database.createDocument(
                '657b4065cd96d233005a',
                '657b4073116903a3a9ac', 
                ID.unique(),
                data
            );

            console.log('Cadastro realizado com sucesso!');
            alert('Cadastro realizado com sucesso!');
        } catch (error) {
            console.error('Erro durante o cadastro:', error);
            alert('Erro durante o cadastro. Verifique os dados e tente novamente.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Cadastro de Usuário</Text>
            <TextInput
                placeholder="Nome"
                style={styles.input}
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                placeholder="Usuário"
                style={styles.input}
                value={user}
                onChangeText={(text) => setUser(text)}
            />
            <TextInput
                placeholder="CPF"
                style={styles.input}
                value={cpf}
                onChangeText={(text) => setCpf(text)}
            />
            <Button
                title="Cadastrar"
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
    button: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 16,
        marginTop: 30,
    },
});

export default CreateUser;
