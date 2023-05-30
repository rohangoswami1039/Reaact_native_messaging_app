import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import {getDatabase}from 'firebase/database'
import { getStorage } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
// add firebase config
 const firebaseConfig = {
  apiKey: "AIzaSyA4F02E4KzNZH8I9neoYmQsfivw8ex5ucM",
  authDomain: "arwes-project.firebaseapp.com",
  projectId: "arwes-project",
  storageBucket: "arwes-project.appspot.com",
  messagingSenderId: "590953632392",
  appId: "1:590953632392:web:21df91578b9b1ee20c453d",
  measurementId: "G-ZFGWBZNQHY"
};

// initialize firebase
const app = initializeApp(firebaseConfig);
const db =getDatabase()
const database = getFirestore()
const storage = getStorage()

// initialize auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth,firebaseConfig,db,storage,database};
