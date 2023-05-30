import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Avatar, Button } from '@rneui/base'
import { auth } from '../../../../config'
import { collection, doc, setDoc } from 'firebase/firestore'
import { database } from '../../../../config/firebase'
import { useState } from 'react'
const Main_Single_chat = (props) => {
  const {uid,phoneNo,photoUrl,Name,sender_uid}=props
  const [loading,set_loading]=useState(false)
  const [disable,set_disable]=useState(false)

  const Invite_friend = async ()=>{
    const docRef = doc(database,'users',`${phoneNo}`,'requests',`${sender_uid}`)
    await setDoc(docRef,{
      Status :'Sent',
      uid:uid,
      Sent_by:sender_uid,
      
      Name:auth.currentUser.displayName,
      Photo_Url:auth.currentUser.photoURL,
      PhoneNo:auth.currentUser.phoneNumber,

    }).then((e)=>{
      console.log("Friend Request is sent")
      set_disable(true)
    }).catch((E)=>{
      console.log(E)
    })

  }


  return (
    <View style={{ flex: 1, backgroundColor: '#fff'}}>
    <View style={{flexDirection:"row",borderBottomWidth:2,borderBottomColor:'#fff',height:75}}>
      <View style={{margin:10}}>
        <TouchableOpacity>
          <Avatar size={50} rounded source={{uri:photoUrl}}/>
        </TouchableOpacity>
      </View>
    <View style={{flexDirection:'column'}}>
     <View style={{marginTop:10,marginLeft:10}}>
        <Text style={{fontSize:15,fontWeight:'500'}}>{Name}</Text>
      </View>
      <View style={{marginLeft:10}}>
        <Text>{phoneNo}</Text>
      </View>
    </View>
      <TouchableOpacity  style={{position:'absolute',right:0,margin:25,justifyContent:'center',alignItems:'center'}}>
      <View>
        <Button onPress={Invite_friend} buttonStyle={{width:75,height:30,}} color={'success'} title={"Add friend"} titleStyle={{fontSize:9}}/>
      </View>
      </TouchableOpacity>
    </View>
  </View>
  )
}

export default Main_Single_chat

const styles = StyleSheet.create({})