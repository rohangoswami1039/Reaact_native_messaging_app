import React, { useRef, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { PhoneAuthProvider } from 'firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View,} from '../components';
import { Colors, auth } from '../config';
import PhoneInput from 'react-native-phone-number-input';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../config/firebase';
import LottieView from 'lottie-react-native';


export const LoginScreen = ({ navigation }) => {
    const [errorState, setErrorState] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const phoneInput = useRef(null);
    const recaptchaVerifier = useRef(null)
    
    async function phone_auth(){
      const phoneProvider = new PhoneAuthProvider(auth)
      phoneProvider.verifyPhoneNumber(phoneNumber,recaptchaVerifier.current)
      .then((e)=>{
          console.log("User Signed in success")
            navigation.push('Verify',{
              verificationId:e,
              phone_no:phoneNumber,
         })
        })
         .catch((e)=>{
           console.log(e)
           setErrorState(e.message)
           ToastAndroid.show(e.message,ToastAndroid.LONG)
          }) 
         }
  return (
    <><FirebaseRecaptchaVerifierModal
      ref={recaptchaVerifier}
      firebaseConfig={firebaseConfig}
    />
    
      <View isSafe style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.screenTitle}>Enter your Mobile Number</Text>
        <Text style={styles.screensubTitle}>You will receive a verification code Carrier rates may apply</Text>
      </View>
      
      <KeyboardAwareScrollView style={{marginTop:10}} enableOnAndroid={false}>
          <PhoneInput
          ref={phoneInput}
          defaultValue={phoneNumber}
          defaultCode="IN"
          layout="first"
          withShadow
          autoFocus
          containerStyle={styles.phoneNumberView}
          textContainerStyle={{ paddingVertical: 12 }}
          onChangeFormattedText={text => {
            setPhoneNumber(text);
          }}
      />
       <TouchableOpacity  style={styles.button} onPress={() => phone_auth()}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity >
        <LottieView
         autoPlay
          style={{
          width:400,
          height:400,
          backgroundColor: '#fff',
        }}source={require('../assets/login.json')}
    />    
        </KeyboardAwareScrollView>
    </View>
    
{/* App info footer */}
<View style={styles.footer}>
    <Text style={styles.footerText}>Created by :-  Rohan Goswami</Text>
</View>

</>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:15
  },
  phoneNumberView: {
    height:50
  }, 
  buttonText:{
    fontSize: 20,
    textAlign: 'center',
    color: 'white'
  },
  logoContainer: {
    alignItems: 'center'
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.black,
    paddingLeft: 10,
    paddingTop:20,

  },
  screensubTitle:{
    fontSize: 22,
    fontWeight: '600',
    color: Colors.black,
    paddingTop:25
  },
  footer: {
    backgroundColor: Colors.white,
    paddingBottom: 20,
    alignItems: 'center'
  },
  footerText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.mediumGray
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    padding: 10,
    width: '100%',
    borderRadius:200,
    backgroundColor:Colors.primary,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: '700'
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
