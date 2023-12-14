// Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import Dashboard from '../screens/Dashboard';
import Home from '../screens/HomePage';
import Lembretes from '../screens/ReactPage';
import Registros from '../screens/RoutesPage';
import Consultas from '../screens/Lembretes';
import Opcoes from '../screens/Options';

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}  />
                <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={Home} options={{ title: 'Home', headerShown: false }} />
                <Stack.Screen name="Lembretes" component={Lembretes} options={{ title: 'Lembretes', headerShown: false }} />
                <Stack.Screen name="Registros" component={Registros} options={{ title: 'Registros', headerShown: false }} />
                <Stack.Screen name="Consultas" component={Consultas} options={{ title: 'Consultas', headerShown: false }} />
                <Stack.Screen name="Opcoes" component={Opcoes} options={{ title: 'Opções', headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;