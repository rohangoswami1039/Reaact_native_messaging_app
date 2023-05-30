import {  Alert, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Avatar, Button } from '@rneui/base'
import { useState } from 'react'
import { Colors, auth } from '../../../config'
import Entypo from 'react-native-vector-icons/Entypo'
import AnimatedLottieView from 'lottie-react-native'
import * as ImagePicker from 'expo-image-picker'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { set } from 'firebase/database'
import { database, db, storage } from '../../../config/firebase'
import { updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'

const Photo_url = (props) => {
    const [name,set_name]=useState('')
    const [image, setImage] = useState(null);
    const navigation = useNavigation()
    console.log(navigation)
    
    const handle_profile_upload = async()=>{
        console.log("Profile upload button is clicked.")
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4,4],
              quality: 1,
            });
            console.log("Result >> ",result)
            if (!result.cancelled) {
              setImage(result.uri);
          
        }
    }
    const handle_profile_= async ()=>{
        console.log("handle profile to firebase ")
        if(name==''){
            console.log("Name is empty ")
            Alert.alert('Alert', 'Name field is Empty. Name must be given', [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
        }else {
            const task = ref(storage,`${auth.currentUser.uid}/profile/${Math.random().toString(36)}`)
            const img = await fetch(image)
            const bytes = await img.blob()
            
            await uploadBytes(task,bytes)
            .then((snapshot)=>{
                console.log('Data Uploaded')
                getDownloadURL(task).then((downloadURL)=>{
                    saveProfile_data(downloadURL)
                }).catch((e)=>{
                    console.log(e)
                })
            })
        }
    }
    const saveProfile_data= async(downloadURL)=>{
        const docRef = doc(database,'users',auth.currentUser.phoneNumber)
        await setDoc(docRef,{
         PhoneNo:auth.currentUser.phoneNumber,
         Name:name,
         uid:auth.currentUser.uid,
         Photo_Url:downloadURL,
        }).then(async(e)=>{
         console.log("User data is uploaded")
         await updateProfile(auth.currentUser,{
            displayName: name, 
            photoURL: downloadURL
         }).then((e)=>{
            ToastAndroid.show('Profile is uploaded',ToastAndroid.LONG)
        }).catch((e)=>{
            console.log(e)
            ToastAndroid.show(e,ToastAndroid.LONG)
         })
        }).catch((E)=>{
         console.log(E)
         ToastAndroid.show(E,ToastAndroid.LONG)
        })
    }


    return (
    <View style={{justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize:25,fontWeight:'500',marginTop:70}}>Please Upload a profile Photo for the Account</Text>
        <View style={{marginTop:15}}>
            <Avatar size={250} rounded source={image?{uri:image}:require('../../../assets/Account_Logo.png')}/>
            <TouchableOpacity onPress={handle_profile_upload}>
                <View style={{position:'absolute',
                          width:70,
                          height:70,
                          bottom:10,
                          right:10,
                          flex:1,
                          borderRadius:100,
                          backgroundColor:Colors.primary}}>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Entypo  name="edit" size={42} color={Colors.white} onPress={handle_profile_upload}/>
                </View>
             </View>
            </TouchableOpacity>
        </View>
        <View style={{margin:10}}>
            <TextInput style={{margin:10}} placeholder={'Enter your Name..'} autoFocus={true} onChangeText={(e)=>{set_name(e)}}/>
            <Button buttonStyle={{marginTop:10,borderRadius:100,backgroundColor:Colors.primary}} title={'Continue'} onPress={()=>{navigation.push('Home')}}/>
        <View style={{justifyContent:'center',alignItems:'center'}}>
        <AnimatedLottieView
            autoPlay
            style={{
                width: 300,
                height: 300,
                backgroundColor: '#fff',
            }}source={require('../../../assets/profile.json')}
            />    
            </View>
        </View>
    </View>
  )
}

export default Photo_url

const styles = StyleSheet.create({})