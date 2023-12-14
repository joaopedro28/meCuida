import React, { useState } from 'react';

import { ScrollView, View, Text, FlatList, StyleSheet } from 'react-native';

const Lista = ({ dataRoutes }) => {
    const [data, setData] = useState(dataRoutes);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.item}>
                <Text style={styles.itemText}>{item.nome}</Text>
                <Text style={styles.subitemText}>{item.subitem}</Text>
            </View>
        );
    };

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingVertical: 20,
        paddingHorizontal: 16,
        paddingBottom: 30
    },
    item: {
        backgroundColor: '#4f4f4f',
        borderRadius: 8,
        marginBottom: 12,
        padding: 16
    },
    itemText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 600
    },
    subitemText: {
        fontSize: 14,
        color: '#fff',
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth:1,
        borderTopColor:'#727272'
    }
});

export default Lista;
