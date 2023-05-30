import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen, SignupScreen, ForgotPasswordScreen } from '../screens';
import Verify from '../screens/Verify';
import Photo_url from '../screens/Main/components/Photo_url';

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Verify' component={Verify}/>
      <Stack.Screen name='Signup' component={SignupScreen} />
      <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
      <Stack.Screen name='Photo_url' component={Photo_url} />      
    </Stack.Navigator>
  );
};
