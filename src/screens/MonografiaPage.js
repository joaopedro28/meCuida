import React from 'react';
import { View, Text , ScrollView, StyleSheet} from 'react-native';
import Accordion from '../components/Accordion';

import jsonData from '../../assets/json/monografia.json';

const data = jsonData.monografia;

function MonografiaPage() {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Monografia Gabriel</Text>
            <Accordion data={data} listItemColor="#0c7fcc" bulletColor="#fff" toggleTextColor="#fff" contentColor="#fff" />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 16,
    },
});

export default MonografiaPage;
