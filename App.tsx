
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ContactsScreen from './screens/ContactScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Contacts App' }}
        />
        <Stack.Screen
          name="Contacts"
          component={ContactsScreen}
          options={{ title: 'My Contacts' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
