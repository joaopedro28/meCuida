import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import Lista from '../components/List';

import jsonDataRoutes from '../../assets/json/routes.json';

const dataRoutes = jsonDataRoutes.routes;


function RoutesPage() {
    return (
        <>
            <Text style={styles.title}>Rotas para usar no front-end</Text>
            <Lista dataRoutes={dataRoutes} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 16,
    },
});

export default RoutesPage;
