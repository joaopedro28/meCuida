import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Button, StyleSheet, Switch, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-modern-datepicker';
import { getToday, getFormatedDate } from 'react-native-modern-datepicker'
import PushNotification from 'react-native-push-notification';
import moment from 'moment';

function Lembretes() {
    const [lembretes, setLembretes] = useState([]);
    const [novoLembrete, setNovoLembrete] = useState('');
    const [tipoLembrete, setTipoLembrete] = useState('Atividade Fisica');
    const [notificacaoAtiva, setNotificacaoAtiva] = useState(false);
    const [date, setDate] = useState('');

    const [open, setOpen] = useState(false);
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [time, setTime] = useState('');

    const today = new Date();
    const startDate = getFormatedDate(today.setDate(today.getDate()), "YYYY/MM/DD h:m");

    useEffect(() => {
        carregarLembretes();
    }, []);

    function handleDateChange(propDate) {
        setDate(propDate);
    }

    function handleOpen() {
        setOpen(!open);
    }

    function handleOpenDatePicker() {
        setOpenDatePicker(!openDatePicker);
    }
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
            setOpen(!open)
        } catch (error) {
            console.error('Erro ao salvar lembretes no AsyncStorage:', error);
        }
    };

    const adicionarLembrete = () => {
        if (novoLembrete.trim() !== '') {
            const novoLembreteObj = { texto: novoLembrete, tipo: tipoLembrete, notificacao: notificacaoAtiva, data: date, hora: time };
            const novosLembretes = [...lembretes, novoLembreteObj];

            setLembretes(novosLembretes);
            setNovoLembrete('');
            salvarLembretes(novosLembretes);

            // if (notificacaoAtiva) {
            //     agendarNotificacao(date, time, novoLembrete);
            // }
        }
    };
    const transformarData = (dataString) => {
        // Utilizando moment para converter a string para o formato desejado
        const dataFormatada = moment(dataString, 'YYYY/MM/DD HH:mm').toISOString();

        return dataFormatada;
    };


    const agendarNotificacao = (data, hora) => {
        const dataHora = `${data} ${hora}`;
        const dataFormatada = transformarData(dataHora);
        const agora = new Date();

        // Converte dataFormatada para um timestamp
        const timestampDataFormatada = moment(dataFormatada).valueOf();

        // Verifica se a data e hora selecionadas são futuras
        if (timestampDataFormatada > agora.getTime()) {
            PushNotification.localNotificationSchedule({
                message: 'Seu lembrete!',
                date: new Date(timestampDataFormatada), // Convertendo de volta para um objeto Date
                allowWhileIdle: true,
            });
        } else {
            console.log('A data e hora selecionadas são no passado.');
        }
    };
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Lembretes</Text>

            <Button title="Adicionar Lembrete" onPress={handleOpen} />

            <Modal
                transparent={true}
                visible={open}
                animationType="slide"
            >
                <View
                    style={styles.modal}
                >
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.closeModal} onPress={handleOpen} >
                            <Text style={styles.closeModalText}>X</Text>
                        </TouchableOpacity>

                        <Text style={styles.label}>Tipo de Lembrete</Text>
                        <View style={styles.pickerContainer}>
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

                        <TextInput
                            placeholder="Texto do lembrete"
                            value={novoLembrete}
                            onChangeText={(text) => setNovoLembrete(text)}
                            style={styles.input}
                        />

                        <View style={styles.dateContainer}>
                            <TouchableOpacity style={styles.dateButton} onPress={handleOpenDatePicker} >
                                <Text style={styles.dateButtonText}>Escolha a Data e Hora</Text>
                            </TouchableOpacity>
                            <Text style={styles.selectedDateText}>{date} {time}</Text>
                        </View>

                        <View style={styles.switchContainer}>
                            <Text>Ativar Notificação</Text>
                            <Switch
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={notificacaoAtiva ? '#f5dd4b' : '#f4f3f4'}
                                onValueChange={(value) => setNotificacaoAtiva(value)}
                                value={notificacaoAtiva}
                            />

                        </View>

                        <Button title="Adicionar Lembrete" onPress={adicionarLembrete} />
                    </View>
                </View>
            </Modal>

            <Modal
                transparent={true}
                visible={openDatePicker}
                animationType="slide"
            >
                <View style={styles.modal}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.closeModal} onPress={handleOpenDatePicker} >
                            <Text style={styles.closeModalText}>X</Text>
                        </TouchableOpacity>

                        <DatePicker
                            minimumDate={startDate}
                            onDateChange={handleDateChange}
                            selected={date}
                            onTimeChange={selectedTime => { setTime(selectedTime); setOpenDatePicker(false) }}
                        />
                    </View>
                </View>
            </Modal>

            {/* Lista de lembretes */}
            {lembretes.map((lembrete, index) => (
                <View key={index} style={styles.lembreteItem}>
                    <Text>{lembrete.texto}</Text>
                    <Text>Tipo: {lembrete.tipo}</Text>
                    <Text>Data e Hora: {lembrete.data} {lembrete.hora}</Text>
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
        marginBottom: 16,
    },
    selectedDateText: {
        fontSize: 16,
        marginBottom: 10,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        gap: 20
    },
    dateButton: {
        backgroundColor: '#2b47e5',
        padding: 10,
        borderRadius: 4,
        marginRight: 10,
    },
    dateButtonText: {
        color: '#fff',
        fontSize: 14,
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
        marginBottom: 15,
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
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
        textAlign: 'left',
        marginVertical: 8,
    },
    picker: {
        height: 40,
        borderWidth: 1,
        borderColor: '#000',
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
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        margin: 16,
        padding: 20,
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
    }
});

export default Lembretes;
