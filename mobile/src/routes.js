/* eslint-disable react/prop-types */
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import DeliveryInfo from './pages/DeliveryInfo';
import Signature from './pages/Signature';
import DeliveryProblem from './pages/DeliveryProblem';
import Problem from './pages/Problem';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            Dashboard: {
              screen: createStackNavigator({
                Dashboard: {
                  screen: Dashboard,
                  navigationOptions: {
                    headerShown: false,
                  },
                },
                DeliveryInfo: {
                  screen: DeliveryInfo,
                  navigationOptions: {
                    headerTitle: 'Informações da entrega',
                    headerStyle: {
                      backgroundColor: '#7D40E7',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                      fontSize: 16,
                      marginLeft: 40,
                      borderBottomColor: 'transparent',
                    },
                  },
                },
                Signature: {
                  screen: Signature,
                  navigationOptions: {
                    headerTitle: 'Confirmar entrega',
                    headerStyle: {
                      backgroundColor: '#7D40E7',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                      fontSize: 16,
                      marginLeft: 50,
                      borderBottomColor: 'transparent',
                    },
                  },
                },
                DeliveryProblem: {
                  screen: DeliveryProblem,
                  navigationOptions: {
                    headerTitle: 'Informar problema',
                    headerStyle: {
                      backgroundColor: '#7D40E7',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                      fontSize: 16,
                      marginLeft: 50,
                      borderBottomColor: 'transparent',
                    },
                  },
                },
                Problem: {
                  screen: Problem,
                  navigationOptions: {
                    headerTitle: 'Visualizar problemas',
                    headerStyle: {
                      backgroundColor: '#7D40E7',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                      fontSize: 16,
                      marginLeft: 50,
                      borderBottomColor: 'transparent',
                    },
                  },
                },
              }),
              navigationOptions: {
                header: null,
                tabBarLabel: 'Entregas',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="reorder" size={20} color={tintColor} />
                ),
              },
            },
            Profile,
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#7D40E7',
              inactiveTintColor: '#999999',
            },
          }
        ),
      },
      { initialRouteName: signedIn ? 'App' : 'Sign' }
    )
  );
