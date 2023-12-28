import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import useAppWrite from './src/composables/useAppWrite';
import { Databases } from 'appwrite';
import { v4 as uuidv4 } from 'uuid';

// Substitua useAsyncData pela sua implementação
const useAsyncData = asyncFunction => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await asyncFunction();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};

export default function App() {
    const appwrite = useAppWrite();
    const database = new Databases(appwrite);

    const { data, loading, error } = useAsyncData(() =>
        database.listDocuments('657b4065cd96d233005a', '657b4073116903a3a9ac')
    );

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            {loading && <Text>Loading...</Text>}

            {error && <Text>Error: {error.message}</Text>}

            {data && (
                <FlatList
                    data={data.documents}
                    keyExtractor={item => item.$id}
                    renderItem={({ item }) => (
                        <View>
                            <Text>Name: {item.name}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});



