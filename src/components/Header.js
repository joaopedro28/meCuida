import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ title }) => (
    <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        width: '100%',
        paddingTop:20,
        backgroundColor: '#8ECDF1',
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default Header;
