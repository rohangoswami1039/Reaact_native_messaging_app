import React, { useState, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';

import { AuthStack } from './AuthStack';
import { AppStack } from './AppStack';
import { AuthenticatedUserContext } from '../providers';
import { LoadingIndicator } from '../components';
import { auth } from '../config';
import { View } from 'react-native';
import { Text } from 'react-native';
import Photo_url from '../screens/Main/components/Photo_url';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens';
import { doc, updateDoc } from 'firebase/firestore';
import { database } from '../config/firebase';
import { onDisconnect, onValue, ref, set } from 'firebase/database';
import { db } from '../config/firebase';

export const RootNavigator = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);
  const Stack = createStackNavigator()
 
  useEffect(() => {
    const handleAuthStateChanged = (User) => {
      if (User) {
        const userId = User.uid;
        const onlineRef = ref(db, `/online/${userId}`);

        set(onlineRef, Date.now()).then(() => console.log('Online presence set'));
        // Remove the node whenever the client disconnects
        onDisconnect(onlineRef)
          .remove()
          .then(() => console.log('On disconnect function configured.'));
        // Listen for changes to the /online/:userId value
        setUser(User)
        setIsLoading(false)
        }
      else {
        setUser(null)
        setIsLoading(false)
      }
    };
    console.log(user)
    const unsubscribe = auth.onAuthStateChanged(handleAuthStateChanged)
    return ()=> unsubscribe();
  }, [user]);
  
  if (isLoading) {
    return <LoadingIndicator />;
  }

  if(user && user.photoURL){
    return(
      <NavigationContainer>
        {user.photoURL && <AppStack/>}
      </NavigationContainer>
      )
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
