import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch } from 'react-native';
import useAppWrite from '../../composables/useAppWrite';
import { Databases, ID } from 'appwrite';
import { ScrollView } from 'react-native-gesture-handler';

const CreateHealthProfile = () => {
    const appwrite = useAppWrite();
    const database = new Databases(appwrite);

    const [specialty, setSpecialty] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');
    const [admin, setAdmin] = useState(false);
    const [name, setName] = useState('');
    const [user, setUser] = useState('');
    const [cpf, setCpf] = useState('');

    const handleRegister = async () => {
        try {
            const data = {
                specialty: specialty,
                documentType: documentType,
                documentNumber: documentNumber,
                admin: admin,
                name: name,
                user: user,
                cpf: cpf,
            };

            const response = await database.createDocument(
                '657b4065cd96d233005a',
                '657b40ffead20fadf40e',
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
        <>
            <ScrollView style={styles.ScrollView}>
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
                    <TextInput
                        placeholder="Especialidade"
                        style={styles.input}
                        value={specialty}
                        onChangeText={(text) => setSpecialty(text)}
                    />
                    <TextInput
                        placeholder="Tipo de documento"
                        style={styles.input}
                        value={documentType}
                        onChangeText={(text) => setDocumentType(text)}
                    />
                    <TextInput
                        placeholder="Número do documento"
                        style={styles.input}
                        value={documentNumber}
                        onChangeText={(text) => setDocumentNumber(text)}
                    />
                    <View style={styles.switch}>
                        <Text style={styles.switchText}>É Admin?</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={admin ? '#f5dd4b' : '#f4f3f4'}
                            value={admin}
                            onValueChange={(value) => setAdmin(!admin)}
                        />
                    </View>
                    <Button
                        title="Cadastrar"
                        onPress={handleRegister}
                        style={styles.button}
                    />
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8ECDF1',
        paddingVertical: 20,
    },
    ScrollView: {
        marginHorizontal: 'auto',
        height: '100%',
    },
    switch: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'space-between',
    },
    switchText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
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
        justifyContent: 'center',
        color: '#000',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 16,
        marginTop: 30,
    },
});

export default CreateHealthProfile;
