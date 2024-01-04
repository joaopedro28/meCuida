// Dashboard.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Header from '../components/Header';

import HomeAdmin from './admin/HomeAdmin';
import CreateAppointment from './admin/CreateAppointment';
import CreateUser from './admin/CreateUser';
import OptionsAdmin from './admin/OptionsAdmin';
import CreateHealthProfile from './admin/CreateHealthProfile';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

const TabIcon = ({ name, color, focused }) => {
    const iconColor = focused ? color : '#1476aa';

    return (
        <MaterialCommunityIcons
            name={name}
            color={iconColor}
            size={26}
            style={{ backgroundColor: 'transparent' }}
        />
    );
};

const Dashboard = () => {
    return (
        <>
            <Header title="Me Cuida Painel Adminstrativo" />

            <Tab.Navigator
                initialRouteName="HomeAdmin"
                activeColor="#fff"
                inactiveColor="#1476aa"
                barStyle={{ backgroundColor: '#8ECDF1' }}
            >

                <Tab.Screen
                    name="HomeAdmin"
                    component={HomeAdmin}
                    options={{
                        tabBarLabel: 'Home',
                        backgroundColor: 'transparent',
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon name="home" backgroundColor='transparent' color={color} focused={focused} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="CreateUser"
                    component={CreateUser}
                    options={{
                        tabBarLabel: 'Criar Usuario',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="account-plus" color={color} size={26} style={{ backgroundColor: 'transparent' }} />
                        ),
                        tabBarColor: '#2b47e5'
                    }}
                />

                <Tab.Screen
                    name="CreateAppointment"
                    component={CreateAppointment}
                    options={{
                        backgroundColor: 'transparent',
                        tabBarLabel: 'Registrar Consulta',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="beaker-plus" color={color} size={26} style={{ backgroundColor: 'transparent' }} />
                        ),
                        tabBarColor: '#2b47e5'
                    }} />

                <Tab.Screen
                    name="CreateHealthProfile"
                    component={CreateHealthProfile}
                    options={{
                        tabBarLabel: 'Profissional Da Saúde',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="signal-hspa-plus" color={color} size={26} />
                        ),
                        tabBarColor: '#2b47e5'
                    }}
                />
                <Tab.Screen
                    name="Opções"
                    component={OptionsAdmin}
                    options={{
                        tabBarLabel: 'Opções',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="cog" color={color} size={26} />
                        ),
                        tabBarColor: '#2b47e5'
                    }}
                />

            </Tab.Navigator>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Dashboard;
