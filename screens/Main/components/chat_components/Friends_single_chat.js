import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { Avatar, Button, Image, Overlay } from '@rneui/base'
import Entypo from 'react-native-vector-icons/Entypo'
import { Colors, auth } from '../../../../config'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { collection, orderBy, query } from 'firebase/firestore'


const Friends_single_chat = (props) => {
    const {uid,phoneNo,photoUrl,Name,Uid}=props
    const [Overlay_profile,set_Overlay_profile]=useState(false)
    const navigation = useNavigation()
    const toggle_overlay_profile=()=>{
        set_Overlay_profile(!Overlay_profile)
      }


    const handle_chats = ()=>{
      
    }
  return (
    <View style={{ flex: 1, backgroundColor: '#fff'}}>
    <View style={{flexDirection:"row",borderBottomWidth:2,borderBottomColor:'#fff',height:75}}>
      <View style={{margin:10}}>
        <TouchableOpacity onPress={toggle_overlay_profile} >
          <Avatar size={50} rounded source={{uri:photoUrl}}/>
        </TouchableOpacity>
    <Overlay overlayStyle={{backgroundColor:'#00000000'}} isVisible={Overlay_profile} onBackdropPress={toggle_overlay_profile}>
      <View style={{margin:15}}>
        <Image
        source={{ uri:photoUrl }}
        style={{ width: 300, height: 300 }}
        />
      </View>
    </Overlay>
      </View>
    <View style={{flexDirection:'column'}}>
     <View style={{marginTop:10,marginLeft:10}}>
        <Text style={{fontSize:15,fontWeight:'500'}}>{Name}</Text>
      </View>
      <View style={{marginLeft:10}}>
        <Text>{phoneNo}</Text>
      </View>
    </View>
      <TouchableOpacity onPress={handle_chats}  style={{position:'absolute',right:0,margin:25,justifyContent:'center',alignItems:'center'}}>
        <View>
          <Entypo name="dots-three-vertical" size={22} color={Colors.mediumGray} />   
        </View>
      </TouchableOpacity>
    </View>
  </View>
  )
}

export default Friends_single_chat

const styles = StyleSheet.create({})