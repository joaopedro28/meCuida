// Dashboard.js
import React from 'react';
import { StyleSheet } from 'react-native';
import Header from '../components/Header';

import HomePage from './HomePage';
import Lembretes from './Lembretes';
import RegisterActivities from './RegisterActivities';
import Appointments from './Appoitmens';
import OptionsPage from './Options';

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
            <Header title="Me Cuida" />
            <Tab.Navigator
                initialRouteName="Home"
                activeColor="#fff"
                inactiveColor="#1476aa"
                barStyle={{ backgroundColor: '#8ECDF1' }}
            >

                <Tab.Screen
                    name="Home"
                    component={HomePage}
                    options={{
                        backgroundColor: 'transparent',
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon name="home" backgroundColor='transparent' color={color} focused={focused} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Lembretes"
                    component={Lembretes}
                    options={{
                        tabBarLabel: 'Lembretes',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="clock" color={color} size={26} style={{ backgroundColor: 'transparent' }} />
                        ),
                        tabBarColor: '#2b47e5'
                    }}
                />

                <Tab.Screen
                    name="Registrar Atividades"
                    component={RegisterActivities}
                    options={{
                        backgroundColor: 'transparent',
                        tabBarLabel: 'Atividades',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="playlist-edit" color={color} size={26} style={{ backgroundColor: 'transparent' }} />
                        ),
                        tabBarColor: '#2b47e5'
                    }} />

                <Tab.Screen
                    name="Consultas"
                    component={Appointments}
                    options={{
                        tabBarLabel: 'Consultas',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="doctor" color={color} size={26} style={{ backgroundColor: 'transparent' }} />
                        ),
                        tabBarColor: '#2b47e5'
                    }}
                />
                <Tab.Screen
                    name="Opções"
                    component={OptionsPage}
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
