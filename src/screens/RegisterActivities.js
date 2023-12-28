import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, FlatList } from 'react-native';
import { useUser } from '../composables/UserContext';
import { Picker } from '@react-native-picker/picker';
import useAppWrite from '../composables/useAppWrite';
import { Databases, ID } from 'appwrite';

const RegistroAtividades = () => {
    const { userId } = useUser();
    const [tipoAtividade, setTipoAtividade] = useState('');
    const [turno, setTurno] = useState('');
    const [descricao, setDescricao] = useState('');
    const [date, setData] = useState('');
    const [atividades, setAtividades] = useState([]);

    const appwrite = useAppWrite();
    const database = new Databases(appwrite);

    const loadAtividades = async () => {
        try {
            const response = await database.listDocuments('657b4065cd96d233005a', '65898dfcd677d6ad2341');
            const atividadesDoUsuario = response.documents.filter((atividade) => atividade.profile.$id === userId);
            setAtividades(atividadesDoUsuario);
        } catch (error) {
            console.error('Erro ao carregar atividades', error);
        }
    };

    useEffect(() => {
        loadAtividades();
    }, [userId]);

    const registrarAtividade = async () => {

        const data = {
            type: tipoAtividade,
            activity_shift: turno,
            date: date,
            description: descricao,
            profile: userId
        };

        try {
            const response = await database.createDocument('657b4065cd96d233005a', '65898dfcd677d6ad2341', ID.unique(), data);
            console.log('response', response);
            alert('Atividade Registrada com Sucesso.');
            loadAtividades(); // Recarrega a lista após o registro
        } catch (error) {
            console.error('Erro durante o registro', error);
        }

        // Limpar os campos após o registro
        setTipoAtividade('');
        setTurno('');
        setDescricao('');
        setData('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Registrar Atividade</Text>
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

            <TextInput
                placeholder="Descrição"
                value={descricao}
                onChangeText={(text) => setDescricao(text)}
                style={styles.input}
            />

            <TextInput
                placeholder="Data"
                value={date}
                onChangeText={(text) => setData(text)}
                style={styles.input}
            />

            <Button title="Registrar Atividade" onPress={registrarAtividade} />

            {/* Lista de Atividades */}
            <FlatList
                data={atividades}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <View style={styles.atividadeItem}>
                        <Text>{item.type}</Text>
                        <Text>{item.activity_shift}</Text>
                        <Text>{item.date}</Text>
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
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
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
});

export default RegistroAtividades;
