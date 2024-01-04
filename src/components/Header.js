import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import logo from '../../assets/logo.png';
import logoText from '../../assets/logo-text.png';


const Header = ({ title }) => (
    <View style={styles.container}>
        <Image
            source={logo} // Caminho da imagem no diretório assets
            style={styles.logo}
        />
        <Image
            source={logoText} // Caminho da imagem no diretório assets
            style={styles.logoText}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        height: 100,
        width: '100%',
        paddingTop: 20,
        backgroundColor: '#8ECDF1',
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6',
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 4,
        marginLeft: 20,   
    },
    logoText: {
        height: 50,
        width: 100,
        resizeMode: 'contain',
        marginRight: 10,
        marginTop: 10,
        marginLeft: 0,   
    },
});

export default Header;
