// Dashboard.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Header from '../components/Header';

// Pages

import HomePage from './HomePage';
import ReactPage from './ReactPage';
import MonografiaPage from './MonografiaPage';
import RoutesPage from './RoutesPage';
import OptionsPage from './Options';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
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
                        name="React"
                        component={ReactPage}
                        options={{
                            backgroundColor: 'transparent',
                            tabBarLabel: 'React',
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="react" color={color} size={26} style={{ backgroundColor: 'transparent' }} />
                            ),
                            tabBarColor: '#2b47e5'
                        }} />
                    <Tab.Screen
                        name="Monografia"
                        component={MonografiaPage}
                        options={{
                            tabBarLabel: 'Monografia',
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="book-open" color={color} size={26} style={{ backgroundColor: 'transparent' }} />
                            ),
                            tabBarColor: '#2b47e5'
                        }}
                    />
                    <Tab.Screen
                        name="Rotas Front-End"
                        component={MonografiaPage}
                        options={{
                            tabBarLabel: 'Rotas Front-End',
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="api" color={color} size={26} style={{ backgroundColor: 'transparent' }} />
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
