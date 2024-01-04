// Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import Dashboard from '../screens/Dashboard';
import Home from '../screens/HomePage';
import Lembretes from '../screens/Lembretes';
import Appointments from '../screens/Appoitmens';
import RegisterActivities from '../screens/RegisterActivities';
import CreateUser from '../screens/admin/CreateUser';
import CreateAppointment from '../screens/admin/CreateAppointment';
import HomePageAdmin from '../screens/admin/HomeAdmin';
import DashboardAdmin from '../screens/DashboardAdmin';
import Opcoes from '../screens/Options';
import OptionsAdmin from '../screens/admin/OptionsAdmin';
import CreateHealthProfile from '../screens/admin/CreateHealthProfile';
const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}  />
                <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={Home} options={{ title: 'Home', headerShown: false }} />
                <Stack.Screen name="Lembretes" component={Lembretes} options={{ title: 'Lembretes', headerShown: false }} />
                <Stack.Screen name="RegisterActivities" component={RegisterActivities} options={{ title: 'Atividades', headerShown: false }} />
                <Stack.Screen name="Consultas" component={Appointments} options={{ title: 'Consultas', headerShown: false }} />
                <Stack.Screen name="Opcoes" component={Opcoes} options={{ title: 'Opções', headerShown: false }} />
                <Stack.Screen name="CreateUser" component={CreateUser} options={{ title: 'Criar Usuário', headerShown: false }} />
                <Stack.Screen name="CreateAppointment" component={CreateAppointment} options={{ title: 'Criar Consulta', headerShown: false }} />
                <Stack.Screen name="DashboardAdmin" component={DashboardAdmin} options={{ headerShown: false }} />
                <Stack.Screen name="HomePageAdmin" component={HomePageAdmin} options={{ title: 'Home', headerShown: false }} />
                <Stack.Screen name="OptionsAdmin" component={OptionsAdmin} options={{ title: 'Opções', headerShown: false }} />
                <Stack.Screen name="CreateHealthProfile" component={CreateHealthProfile} options={{ title: 'Criar Perfil de Saúde', headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;