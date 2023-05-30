import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Avatar, Button } from '@rneui/base'
import { useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import { Colors } from '../../../../config'
import { ToastAndroid } from 'react-native'
import { deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore'
import { auth, database } from '../../../../config/firebase'
import { useNavigation } from '@react-navigation/native'
const Request_single_chat = (props) => {
    const {uid,phoneNo,photoUrl,Name,sender_uid,Uid}=props
    const [loading,set_loading]=useState(false)
    const [disable,set_disable]=useState(false)
    const navigation = useNavigation()
    const handle_accept = async ()=>{
        const docRef = doc(database,'users',`${auth.currentUser.phoneNumber}`,'requests',`${uid}`)
        await updateDoc(docRef,{
            Status:'Accepted'
        }).then(async (e)=>{
            console.log("Friend request accepted")
            const docRef = doc(database,'users',`${auth.currentUser.phoneNumber}`,'Friends',`${uid}`)
            await setDoc(docRef,{
                Name:Name,
                PhoneNo:phoneNo,
                uid:Uid,
                Sent_by:sender_uid,
                Photo_Url :photoUrl,
            }).then(async (e)=>{
                console.log("User is added to the Friend list")
                const docRef = doc(database,'users',`${phoneNo}`,'Friends',`${Uid}`)
                await setDoc(docRef,{
                    Name:auth.currentUser.displayName,
                    PhoneNo:auth.currentUser.phoneNumber,
                    uid:auth.currentUser.uid,
                    Sent_by:sender_uid,
                    Photo_Url :auth.currentUser.photoURL,
                })
                .then((e)=>{
                    console.log(uid,' >>> ',sender_uid,'  ....are friends')
                    navigation.replace("Requests")
                })
                .catch((e)=>{
                    console.log(e)
                })
            }).catch((e)=>{
                console.log(e)
            })
        }).catch((e)=>{
            console.log(e)
        })
    }
    const handle_delete = async ()=>{
        const docRef = doc(database,'users',`${auth.currentUser.phoneNumber}`,'requests',`${uid}`)
        await deleteDoc(docRef).then((e)=>{
            ToastAndroid.show("Request is Cancelled",ToastAndroid.SHORT)
            navigation.replace("Requests")
        })
        .catch((E)=>{
            console.log(E)
        })
    }
    return (
      <View style={{ flex: 1, backgroundColor: '#fff'}}>
      <View style={{flexDirection:"row",borderBottomWidth:2,borderBottomColor:'#EDE4E0',height:75}}>
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
        <TouchableOpacity  style={{position:'absolute',right:0,margin:20,justifyContent:'center',alignItems:'center'}}>
        <View style={{flexDirection:"row",alignItems:'center'}}>
          <Button onPress={handle_accept} buttonStyle={{width:75,height:38,}} color={'success'} title={"Accept"} titleStyle={{fontSize:12}}/>
          <TouchableOpacity onPress={handle_delete}>
            <Entypo onPress={()=>{ToastAndroid.show("Delete Request ",ToastAndroid.SHORT)}} style={{marginLeft:12}} name="circle-with-cross" size={27} color={Colors.mediumGray} />
          </TouchableOpacity>
        </View>
        </TouchableOpacity>
      </View>
    </View>
    )
}

export default Request_single_chat

const styles = StyleSheet.create({})