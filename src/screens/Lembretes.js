import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Button, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Lembretes() {
    const [lembretes, setLembretes] = useState([]);
    const [novoLembrete, setNovoLembrete] = useState('');
    const [tipoLembrete, setTipoLembrete] = useState('Atividade Fisica');
    const [notificacaoAtiva, setNotificacaoAtiva] = useState(false);

    useEffect(() => {
        // Carregar lembretes do AsyncStorage ao iniciar o componente
        carregarLembretes();
    }, []);

    const carregarLembretes = async () => {
        try {
            const lembretesArmazenados = await AsyncStorage.getItem('lembretes');
            if (lembretesArmazenados) {
                setLembretes(JSON.parse(lembretesArmazenados));
            }
        } catch (error) {
            console.error('Erro ao carregar lembretes do AsyncStorage:', error);
        }
    };

    const salvarLembretes = async (novosLembretes) => {
        try {
            await AsyncStorage.setItem('lembretes', JSON.stringify(novosLembretes));
        } catch (error) {
            console.error('Erro ao salvar lembretes no AsyncStorage:', error);
        }
    };

    const adicionarLembrete = () => {
        if (novoLembrete.trim() !== '') {
            const novoLembreteObj = { texto: novoLembrete, tipo: tipoLembrete, notificacao: notificacaoAtiva };
            const novosLembretes = [...lembretes, novoLembreteObj];

            setLembretes(novosLembretes);
            setNovoLembrete('');

            // Salvar lembretes no AsyncStorage
            salvarLembretes(novosLembretes);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Lembretes</Text>

            <View style={styles.pickerContainer}>
                <Text style={styles.label}>Tipo de Lembrete</Text>
                <Picker
                    selectedValue={tipoLembrete}
                    onValueChange={(itemValue) => setTipoLembrete(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item style={styles.label} label="Atividade Fisica" value="Atividade Fisica" />
                    <Picker.Item style={styles.label} label="Tomar Medicação" value="Tomar Medicação" />
                    <Picker.Item style={styles.label} label="Medição de Batimentos" value="Medição de Batimentos" />
                    <Picker.Item style={styles.label} label="Registrar Níveis de Glicemia" value="Registrar Níveis de Glicemia" />
                </Picker>
            </View>

            <View style={styles.switchContainer}>
                <Text>Ativar Notificação</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={notificacaoAtiva ? '#f5dd4b' : '#f4f3f4'}
                    onValueChange={(value) => setNotificacaoAtiva(value)}
                    value={notificacaoAtiva}
                />
            
                <TextInput
                    placeholder="Texto do lembrete"
                    value={novoLembrete}
                    onChangeText={(text) => setNovoLembrete(text)}
                    style={styles.input}
                />
            </View>

            {/* Botão para adicionar novo lembrete */}
            <TouchableOpacity style={styles.adicionarButton} onPress={adicionarLembrete}>
                <Text style={styles.adicionarButtonText}>Adicionar Lembrete</Text>
            </TouchableOpacity>

            {/* Lista de lembretes */}
            {lembretes.map((lembrete, index) => (
                <View key={index} style={styles.lembreteItem}>
                    <Text>{lembrete.texto}</Text>
                    <Text>Tipo: {lembrete.tipo}</Text>
                    <Text>Notificação Ativa: {lembrete.notificacao ? 'Sim' : 'Não'}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

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
    lembreteItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    pickerContainer: {
        marginBottom: 10,
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
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    adicionarButton: {
        backgroundColor: '#2b47e5',
        padding: 16,
        borderRadius: 8,
        marginVertical: 16,
        alignItems: 'center',
    },
    adicionarButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default Lembretes;
