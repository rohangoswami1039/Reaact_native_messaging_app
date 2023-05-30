import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '../screens';
import Settings from '../screens/Main/Menu/Settings';
import Account from '../screens/Main/Menu/Account';
import Privacy from '../screens/Main/Menu/Privacy';
import Notification from '../screens/Main/Menu/Notification';
import Help from '../screens/Main/Menu/Help';
import Profile from '../screens/Main/Menu/Profile';
import Chat from '../screens/Main/Chat';
import All_Contacts from '../screens/Main/components/Contacts';
import Photo_url from '../screens/Main/components/Photo_url';
import Chat_component from '../screens/Main/components/Chat_component';
import Requests from '../screens/Main/components/Requests';
import Chat_Screen from '../screens/Main/components/Chats/Chat_Screen';
import Chat_Profile from '../screens/Main/components/Chats/Chat_Profile';
import Pick_contact from '../screens/Main/components/Chats/Pick_contact';
import { Chat_function_provider } from '../screens/context/Chat_context';
import { auth } from '../config';

const Stack = createStackNavigator();

export const AppStack = () => {
  if(auth.currentUser.photoURL==null){
    return(
      <Photo_url/>
    )
  }else {
    return (
      <Chat_function_provider>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#FFF'}}}>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Settings' component={Settings} screenOptions={{ headerShown: true }}/>
        <Stack.Screen name='Account' component={Account} screenOptions={{ headerShown: true }}/>
        <Stack.Screen name='Privacy' component={Privacy} screenOptions={{ headerShown: true }}/>
        <Stack.Screen name='Notification' component={Notification} screenOptions={{ headerShown: true }}/>
        <Stack.Screen name='Help' component={Help} screenOptions={{ headerShown: true }}/>
        <Stack.Screen name='Profile' component={Profile} screenOptions={{ headerShown: true }}/>
        <Stack.Screen name='Contacts' component={All_Contacts} screenOptions={{ headerShown: true }}/>
        <Stack.Screen name='Chat' component={Chat} screenOptions={{ headerShown: true }}/>
        <Stack.Screen name='Chat_component' component={Chat_component} screenOptions={{ headerShown: true }}/>
        <Stack.Screen name='Requests' component={Requests} screenOptions={{ headerShown: true }}/>
        <Stack.Screen name='Chat_Screen' component={Chat_Screen} screenOptions={{ headerShown: true }}/>
        <Stack.Screen name='Chat_Profile' component={Chat_Profile} screenOptions={{ headerShown: true }}/>
        <Stack.Screen name='Pick_contact' component={Pick_contact} screenOptions={{ headerShown: true }}/>
        
      </Stack.Navigator>
      </Chat_function_provider>
    )
  }
 ;
};
