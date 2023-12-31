import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, FlatList, Modal, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useUser } from '../composables/UserContext';
import useAppWrite from '../composables/useAppWrite';
import { Databases, ID } from 'appwrite';

function RegisterActivities() {
    const { userId } = useUser();
    const [tipoAtividade, setTipoAtividade] = useState('');
    const [turno, setTurno] = useState('');
    const [descricao, setDescricao] = useState('');
    const [atividades, setAtividades] = useState([]);
    const [open, setOpen] = useState(false);

    const appwrite = useAppWrite();
    const database = new Databases(appwrite);

    const loadAtividades = async () => {
        try {
            const response = await database.listDocuments('657b4065cd96d233005a', '65898dfcd677d6ad2341');
            const atividadesDoUsuario = response.documents.filter((atividade) => atividade && atividade.profile && atividade.profile.$id === userId);
            setAtividades(atividadesDoUsuario);
        } catch (error) {
            console.error('Erro ao carregar', error);
        }
    };

    useEffect(() => {
        loadAtividades();
    }, [userId]);

    const registrarAtividade = async () => {

        const data = {
            type: tipoAtividade,
            activity_shift: turno,
            description: descricao,
            profile: userId
        };

        try {
            const response = await database.createDocument('657b4065cd96d233005a', '65898dfcd677d6ad2341', ID.unique(), data);
            alert('Atividade Registrada com Sucesso.');
            loadAtividades();
            setOpen(false);
        } catch (error) {
            alert.error('Erro durante o registro', error);
            setOpen(false);
        }

        setTipoAtividade('');
        setTurno('');
        setDescricao('');
    };

    const handleOpen = () => {
        setOpen(!open);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Registrar Atividade</Text>

            <Button title="Registrar Atividade" onPress={handleOpen} />

            <Modal
                transparent={true}
                visible={open}
                animationType="slide"
            >
                <View style={styles.modal}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.closeModal} onPress={handleOpen} >
                            <Text style={styles.closeModalText}>X</Text>
                        </TouchableOpacity>
                        <View style={styles.pickerContainer}>

                            <Picker
                                selectedValue={tipoAtividade}
                                onValueChange={(itemValue) => setTipoAtividade(itemValue)}
                                style={styles.picker}
                            >
                                <Picker.Item style={styles.label} label="Selecione o Tipo" value="" />
                                <Picker.Item style={styles.label} label="Medicação" value="Medicação" />
                                <Picker.Item style={styles.label} label="Atividade Física" value="Atividade Física" />
                                <Picker.Item style={styles.label} label="Medição de Batimentos" value="Medição de Batimentos" />
                                <Picker.Item style={styles.label} label="Medição de Glicemia" value="Medição de Glicemia" />
                                <Picker.Item style={styles.label} label="Outros" value="Outros" />
                            </Picker>
                        </View>
                        <View style={styles.pickerContainer}>

                            <Picker
                                selectedValue={turno}
                                onValueChange={(itemValue) => setTurno(itemValue)}
                                style={styles.picker}
                            >
                                <Picker.Item style={styles.label} label="Selecione o Turno" value="" />
                                <Picker.Item style={styles.label} label="Manhã" value="Manhã" />
                                <Picker.Item style={styles.label} label="Tarde" value="Tarde" />
                                <Picker.Item style={styles.label} label="Noite" value="Noite" />
                            </Picker>
                        </View>
                        <TextInput
                            placeholder="Descrição"
                            value={descricao}
                            onChangeText={(text) => setDescricao(text)}
                            style={styles.input}
                        />

                        {/* <TextInput
                            placeholder="Data"
                            value={date}
                            onChangeText={(text) => setData(text)}
                            style={styles.input}
                        /> */}

                        <Button title="Registrar Atividade" onPress={registrarAtividade} />
                    </View>
                </View>
            </Modal>
            <FlatList
                data={atividades}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <View style={styles.atividadeItem}>
                        <Text>{item.type}</Text>
                        <Text>{item.activity_shift}</Text>
                        <Text>{item.description}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 16,
    },
    pickerContainer: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor: '#fff',
        color: '#000',
        marginBottom: 10,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    atividadeItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 8,
    },
    closeModalText: {
        color: '#fff',
        paddingHorizontal: 5,
        paddingVertical: 2,
        fontSize: 12,
    },
    closeModal: {
        position: 'absolute',
        top: 10,
        right: 10,
        color: '#fff',
        borderRadius: 30,
        backgroundColor: '#fd0000',
        zIndex: 2
    },
    label: {
        fontSize: 16,
        marginBottom: 4,
    },
    picker: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        margin: 16,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        width: '90%',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        paddingVertical: 35
    }
});

export default RegisterActivities;
