import {  StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors, auth } from '../../../config'
import { Avatar, BottomSheet, Button, Image, Overlay } from '@rneui/base'
import { updateProfile } from 'firebase/auth'
import * as ImagePicker from 'expo-image-picker'
import { database, storage } from '../../../config/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import { Camera, CameraType, FlashMode } from 'expo-camera';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useRef } from 'react'

const Profile = (props) => {
  const [visible, setVisible] = useState(false);
  const [Camera_visible,set_Camera_visible]=useState(false)
  const [name,set_name]=useState('')
  const [image, setImage] = useState(null);
  const [cameraimage,set_cameraimage]=useState(null)
  const [bottom_sheet,set_bottom_sheet]=useState(false)
  const [Overlay_profile,set_Overlay_profile]=useState(false)
  const [loading,setLoading]=useState(false)
  const [camera_overlay,set_camera_overlay]=useState(false)
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [startCamera,setStartCamera]=useState(false)
  const [camera,setcamera]=useState(null)
  const [Overlay_camera_profile,set_Overlay_camera_profile]=useState(false)
  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }



  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const toggleOverlay_Camera = ()=>{
    set_Camera_visible(!Camera_visible);
  }
  const bottom_visible=()=>{
    set_bottom_sheet(!bottom_sheet)
  }
  const toggle_overlay_profile=()=>{
    set_Overlay_profile(!Overlay_profile)
  }
  const toggle_camera_overlay=()=>{
    set_camera_overlay(!camera_overlay)
  }
  const toggle_overlay_camera_profile=()=>{
    set_Overlay_camera_profile(!Overlay_camera_profile)
  }
  const __startCamera = async () => {
    const {status} = await Camera.requestCameraPermissionsAsync()
    if (status === 'granted') {
      // start the camera
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
    }
  }
  const __takePicture = async () => {
    if (camera){
      const data= await camera.takePictureAsync()
      console.log("Photo by camera",data)
      set_cameraimage(data.uri)
      toggle_camera_overlay()
      toggle_overlay_camera_profile()
    }
  }

  const save_name= async ()=>{
    if(name==''){
      ToastAndroid.show('Please Enter some text to continue', ToastAndroid.SHORT);
    }else {
     await updateProfile(auth.currentUser,{
      displayName:name
     }).then((e)=>{
      ToastAndroid.show("User name updated Successfully.",ToastAndroid.SHORT)
      toggleOverlay()
     }).catch((e)=>{
      ToastAndroid.show(e.message,ToastAndroid.SHORT)
     })
    }
  }
  const handle_profile_upload = async()=>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,4],
      quality: 1,
    });
    console.log("Result >> ",result)
    if (!result.cancelled) {
      setImage(result.uri); 
      bottom_visible()
      toggle_overlay_profile()
    }

}
const Upload_profile = async ()=>{
  setLoading(true)
  const task = ref(storage,`${auth.currentUser.uid}/profile/${Math.random().toString(36)}`)
            const img = await fetch(image)
            const bytes = await img.blob()
            
            await uploadBytes(task,bytes)
            .then((snapshot)=>{
                console.log('Data Uploaded')
                getDownloadURL(task).then(async (downloadURL)=>{
                  
                  const docRef = doc(database,'users',auth.currentUser.phoneNumber)
                  await setDoc(docRef,{
                   PhoneNo:auth.currentUser.phoneNumber,
                   Name:auth.currentUser.displayName,
                   uid:auth.currentUser.uid,
                   Photo_Url:downloadURL,
                  }).then(async(e)=>{
                   console.log("User data is uploaded")
                   await updateProfile(auth.currentUser,{
                      photoURL: downloadURL
                   }).then((e)=>{
                      console.log('User Profile is Created')
                      toggle_overlay_profile()
                      setLoading(false)
                   }).catch((e)=>{
                      console.log(e)
                      setLoading(false)
                   })
                  }).catch((E)=>{
                   console.log(E)
                   setLoading(false)
                  })
                }).catch((e)=>{
                    console.log(e)
                })
            })
}
const Upload_profile_camera = async ()=>{
  setLoading(true)
  const task = ref(storage,`${auth.currentUser.uid}/profile/${Math.random().toString(36)}`)
            const img = await fetch(cameraimage)
            const bytes = await img.blob()
            
            await uploadBytes(task,bytes)
            .then((snapshot)=>{
                console.log('Data Uploaded')
                getDownloadURL(task).then(async (downloadURL)=>{
                  
                  const docRef = doc(database,'users',auth.currentUser.phoneNumber)
                  await setDoc(docRef,{
                   PhoneNo:auth.currentUser.phoneNumber,
                   Name:auth.currentUser.displayName,
                   uid:auth.currentUser.uid,
                   Photo_Url:downloadURL,
                  }).then(async(e)=>{
                   console.log("User data is uploaded")
                   await updateProfile(auth.currentUser,{
                      photoURL: downloadURL
                   }).then((e)=>{
                      console.log('User Profile is Created')
                      toggle_overlay_camera_profile()
                      setLoading(false)
                   }).catch((e)=>{
                      console.log(e)
                      setLoading(false)
                   })
                  })
                  .catch((E)=>{
                   console.log(E)
                   setLoading(false)
                  })
                }).catch((e)=>{
                    console.log(e)
                    setLoading(false)
                })
            })
}
const delete_profile = ()=>{
  ToastAndroid.show("Delete Profile is Clicked",ToastAndroid.SHORT)

}

  return (
    <>
    <View style={styles.container}>
       <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
       <View style={styles.Logo_container}>
         <Feather  onPress={()=>{props.navigation.pop()}} style={{marginRight:10}} name="arrow-left" size={27} color={Colors.white} />
         <Text style={styles.Logo_text}>{'Profile'}</Text>
       </View>
       <View style={styles.Logo_container_icons}>
       </View>
       </View>
     </View>
 
     <View style={{alignItems:'center',marginTop:30}}>
      <TouchableOpacity  onPress={toggleOverlay_Camera}>
        <Avatar
        size={150}
        rounded
        source={{uri:auth.currentUser.photoURL}}
        />
      </TouchableOpacity>
    
      <View style={{position:'absolute',
                          width:50,
                          height:50,
                          bottom:-10,
                          right:110,
                          borderRadius:100,
                          backgroundColor:Colors.primary}}>
            
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity onPress={bottom_visible}>
                    <Feather  name="camera" size={32} color={Colors.white} />
                  </TouchableOpacity>
                </View>
          </View>
    </View>
    <View style={{marginTop:15}}>
      <View style={{flexDirection:'row'}}>
        <View style={{margin:15}}>
           <Feather  name="user" size={32} color={Colors.mediumGray} />
        </View>
        <View style={{margin:15}}>
          <View style={{flexDirection:'row'}}>
            <View>
            <Text style={{fontSize:12}}>Name</Text>
            <Text style={{fontSize:14}}>{auth.currentUser.displayName}</Text>
            </View> 
            <TouchableOpacity onPress={toggleOverlay}>
            <Feather style={{marginLeft:180,margin:15}}  name="edit-2" size={20} color={Colors.alert_green} />
            </TouchableOpacity>
            
          </View>
          <Text style={{width:'40%',marginTop:10,color:Colors.mediumGray}}>This is your DisplayName which is saved on the server and display all of your contacts. </Text>
        </View>
      </View>
    </View>
    
    <View style={{marginTop:15}}>
      <View style={{flexDirection:'row'}}>
        <View style={{margin:15}}>
           <Feather  name="phone" size={32} color={Colors.mediumGray} />
        </View>
        <View style={{margin:15}}>
          <View style={{flexDirection:'row'}}>
            <View>
            <Text style={{fontSize:12}}>Phone no.</Text>
            <Text style={{fontSize:14}}>{auth.currentUser.phoneNumber}</Text>
            </View> 
          </View>
        </View>
      </View>
    </View>
    <Overlay overlayStyle={{backgroundColor:'white'}} isVisible={visible} onBackdropPress={toggleOverlay}>
      <View style={{backgroundColor:'white',margin:10}}>
      <Text style={{color:Colors.mediumGray}}>This is your DisplayName which is saved on the server and display to all of your contacts.</Text>
        <TextInput onChangeText={(e)=>{set_name(e)}} style={{marginBottom:10,marginTop:20}} placeholder='Enter the Display Name '/>
        <View style={{flexDirection:'row',marginTop:30,marginLeft:150}}>
          <Button buttonStyle={{marginRight:10}} type='clear' title={'Cancel'} onPress={toggleOverlay}/>
          <Button type='clear' onPress={save_name} title={'Save'}/>
        </View>
      </View>
    </Overlay>
    <Overlay overlayStyle={{backgroundColor:'#00000000'}} isVisible={Camera_visible} onBackdropPress={toggleOverlay_Camera}>
      <View style={{}}>
        <Image
        source={{ uri: auth.currentUser.photoURL }}
        style={{ width: 300, height: 300 }}
        />
      </View>
    </Overlay>
    <Overlay overlayStyle={{backgroundColor:'#00000000'}} isVisible={camera_overlay} >
      <View style={{backgroundColor:'#fff',height:520,width:340}}>
      {startCamera ? (
        <Camera ref={ref=>setcamera(ref)} style={{width:315,height:450,margin:10}} type={type} ratio={['4:4','4:4']}>
          <View style={{flexDirection:'row',position:'absolute',bottom:10}}>
          <TouchableOpacity style={{margin:10}} onPress={toggleCameraType}>
            <Ionicons  name="ios-camera-reverse-sharp" size={32} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={__takePicture} style={{marginLeft:85}}>
          <MaterialIcons  name="camera" size={52} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{ToastAndroid.show("Flash mode is not emplemneted",ToastAndroid.SHORT)}} style={{margin:10,marginLeft:85}}>
          <MaterialIcons  name="flash-on" size={32} color={Colors.white} />
          </TouchableOpacity>
        </View>
        </Camera>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <TouchableOpacity
            onPress={__startCamera}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: Colors.primary,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Take picture
            </Text>
          </TouchableOpacity>
        </View>
      )}
          <View style={{position:'absolute',bottom:10,right:20}}>
            <Button type='clear' title={'Cancel'} onPress={toggle_camera_overlay}/>
          </View>
      </View>
    </Overlay>
    <BottomSheet backdropStyle={{borderTopRightRadius:50,borderTopLeftRadius:50}} isVisible={bottom_sheet} containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }} onBackdropPress={bottom_visible}>
      <View style={{flex:1,height:120,borderTopRightRadius:50,borderTopLeftRadius:50,backgroundColor:Colors.white,justifyContent:'center',alignItems:'center'}}>
        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
        <Text style={{fontSize:16,fontWeight:'500',marginTop:10}}>Profile Photo</Text>
        <TouchableOpacity onPress={delete_profile}>
        <MaterialCommunityIcons style={{marginLeft:150,marginTop:10}} name="delete" size={32} color={Colors.primary} />
        </TouchableOpacity>
        
        </View>
        <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          {/** Camera section for the profile */}
          <TouchableOpacity onPress={toggle_camera_overlay}>
            <View style={{backgroundColor:Colors.white,width:50,height:50,justifyContent:'center',alignItems:'center',borderRadius:100,borderWidth:2,borderColor:Colors.margin,marginTop:10,marginRight:25}}>
            <Feather  name="camera" size={22} color={Colors.primary} />
            </View>
            <Text style={{fontSize:12,color:Colors.mediumGray}}>Camera</Text>
          </TouchableOpacity>
          {/** Image Section for the profile  */}
          <TouchableOpacity onPress={handle_profile_upload}>
            <View style={{backgroundColor:Colors.white,width:50,height:50,justifyContent:'center',alignItems:'center',borderRadius:100,borderWidth:2,borderColor:Colors.margin,marginTop:10,marginLeft:25}}>
            <Feather  name="image" size={22} color={Colors.primary} />
            </View>
            <Text style={{fontSize:12,color:Colors.mediumGray,marginLeft:25}}>Gallery</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </BottomSheet>
    <Button buttonStyle={{margin:25,borderRadius:25,backgroundColor:Colors.primary}} onPress={()=>{auth.signOut()}} title={'Sign Out'}/>
    {image && <Overlay overlayStyle={{backgroundColor:'#fff'}} isVisible={Overlay_profile} onBackdropPress={toggle_overlay_profile}>
      <View style={{margin:15}}>
        <Image
        source={{ uri: image }}
        style={{ width: 300, height: 300 }}
        />
        <Button buttonStyle={{borderRadius:100,marginTop:20}} loading={loading} onPress={Upload_profile} title={'Upload'}/>
      </View>
    </Overlay>
    }
    {cameraimage && <Overlay overlayStyle={{backgroundColor:'#fff'}} isVisible={Overlay_camera_profile} onBackdropPress={toggle_overlay_camera_profile}>
      <View style={{margin:15}}>
        <Image
        source={{uri:cameraimage}}
        style={{ width: 300, height: 300 }}
        />
        <Button buttonStyle={{borderRadius:100,marginTop:20}} loading={loading} onPress={Upload_profile_camera} title={'Upload'}/>
      </View>
    </Overlay>
    }
    </>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    height:100
  },
  Logo_container:{
    flexDirection:'row',
    paddingTop:50,
    paddingLeft:10,
  },
  Logo_text:{
    color:Colors.white,
    fontSize:19,
    fontWeight:'500',
    letterSpacing:2
  },
  Logo_container_icons:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    paddingTop:50,
    paddingLeft:10,
    marginLeft:85
  },
})