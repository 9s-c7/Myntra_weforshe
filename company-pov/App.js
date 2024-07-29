import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './screens/Dashboard';
import CompanyPage from './screens/CompanyPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CompanyPage">
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="CompanyPage" component={CompanyPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;