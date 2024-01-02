import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import useAppWrite from '../composables/useAppWrite';
import { Databases } from 'appwrite';
import { useUser } from '../composables/UserContext';

const LoginScreen = () => {
    const navigation = useNavigation();
    const appwrite = useAppWrite();
    const database = new Databases(appwrite);

    const { setGlobalUserId } = useUser();

    const [user, setUser] = useState('');
    const [cpf, setCpf] = useState('');

    const handleLogin = async () => {
        
        
        try {
            // Faça a solicitação ao Appwrite para obter os dados do usuário e do CPF
            const dataAdmin =  await database.listDocuments('657b4065cd96d233005a', '657b40ffead20fadf40e').then((response) => {
                return response.documents
            });

            if (Array.isArray(dataAdmin) && dataAdmin.length > 0) {
                const userExists = dataAdmin.some(item => item.user === user);
                const cpfMatches = dataAdmin.some(item => item.cpf === cpf);
                const isAdmin = dataAdmin.some(item => item.admin === true);

                if (userExists && cpfMatches && isAdmin) {
                    let userId = ''
                    
                    dataAdmin.find((item) => {
                        if (item.user === user) {
                            userId = item.$id
                            setGlobalUserId(userId);
                        } 
                    })
                    
                    navigation.dispatch(StackActions.replace('DashboardAdmin'));
                    
                    return;
                }

                else {
                    const data =  await database.listDocuments('657b4065cd96d233005a', '657b4073116903a3a9ac').then((response) => {
                        return response.documents
                    });
        
                    // Verifique se os dados do usuário e do CPF correspondem
                    if (Array.isArray(data) && data.length > 0) {
                        const userExists = data.some(item => item.user === user);
                        const cpfMatches = data.some(item => item.cpf === cpf);
                        
                        if (userExists && cpfMatches) {
                            let userId = ''
                            
                            data.find((item) => {
                                if (item.user === user) {
                                    userId = item.$id
                                    setGlobalUserId(userId);
                                } 
                            })
                            
                            navigation.dispatch(StackActions.replace('Dashboard'));
                            
                            return;
                        }
                    }        
                }
            }
            // Se não correspondem, exiba uma mensagem de erro ou tome outra ação apropriada
            alert('Credenciais inválidas. Verifique seu usuário e CPF.');
        } catch (error) {
            console.error('Erro durante o login:', error);
        }
    };
    
    return (
        <View style={styles.container}>
            <TextInput
                placeholder="User"
                style={styles.input}
                placeholderTextColor="#000"
                value={user}
                onChangeText={(text) => setUser(text)}
            />
            <TextInput
                placeholder="CPF"
                secureTextEntry
                style={styles.input}
                placeholderTextColor="#000"
                value={cpf}
                onChangeText={(text) => setCpf(text)}
            />
            <Button
                title="Login"
                onPress={handleLogin}
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

export default LoginScreen;
