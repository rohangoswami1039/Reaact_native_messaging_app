import { StyleSheet, Text, View } from 'react-native'

import { KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import OTPTextView from 'react-native-otp-textinput'


//phone auth 
import firebase from 'firebase/compat/app'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth'
import { Button } from '../components'
import { Colors, auth } from '../config'
import { database, db } from '../config/firebase'
import { ref, set } from 'firebase/database'
import { doc, setDoc } from 'firebase/firestore'

const Verify = (props) => {
    const otp = useRef()
    const verificationId=props.route.params.verificationId
    const [verification_code,set_verification_code]=useState(null)
    const Clear_Verification_code = ()=>{
        set_verification_code('')
      } 
      const Verification_code= async ()=>{
        const credential =  PhoneAuthProvider.credential(verificationId,verification_code)
        console.log("Credential >> ",credential)
        await signInWithCredential(auth,credential)
        .then(async (e)=>{
         const docRef = doc(database,'users',e.user.phoneNumber)
          await setDoc(docRef,{
          PhoneNo:e.user.phoneNumber,
          Name:e.user.displayName,
          uid:e.user.uid,
          Photo_Url:e.user.photoURL,
         }).then((e)=>{
          console.log("User data is uploaded")
         }).catch((E)=>{
          console.log(E)
         })
        })    
        .catch((E)=>{
          console.log(E.message)
        })
      }
  return (
    <>
    <KeyboardAvoidingView>
      <View style={styles.Verification_code}>
        <Text style={{marginTop:55,fontSize:20,fontWeight:'500'}}>Enter the Verification code </Text>
        <Text><Text style={{fontWeight:'500'}}>code is sent to:</Text>{props.route.params.phone_no}</Text>
        <View style={{marginTop:10}}>
          <OTPTextView inputCount={6} ref={otp} tintColor={Colors.primary} keyboardType="numeric"  handleTextChange={e => {set_verification_code(e)}}/>
        </View>
      </View>
      <TouchableOpacity >
        <Button onPress={Clear_Verification_code} buttonStyle={{marginLeft:40,marginTop:20,width:'80%',textAlign: 'center',}} type="clear" title={'Clear'}/>
      </TouchableOpacity>
      <View style={{marginTop:10,justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity  style={styles.button}  onPress={Verification_code}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity >
      </View>
      
    </KeyboardAvoidingView>
    </>
  )
}

export default Verify

const styles = StyleSheet.create({
    Verification_code:{
        justifyContent:'center',
        alignItems:'center'
      },  
      button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        width: '90%',
        borderRadius:200,
        padding: 8,
        backgroundColor:Colors.primary,
      }, 
      buttonText:{
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
      }
})