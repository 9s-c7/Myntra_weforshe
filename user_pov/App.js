import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Clone from './screens/Clone';
import InfiniteScroll from './screens/InfiniteScroll';
import CompanyPage from './screens/CompanyPage';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Clone">
                <Stack.Screen name="Clone" component={Clone} />
                <Stack.Screen name="InfiniteScroll" component={InfiniteScroll} />
                <Stack.Screen name="CompanyPage" component={CompanyPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
