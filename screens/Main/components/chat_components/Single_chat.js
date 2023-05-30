import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Avatar, Image, Overlay } from '@rneui/base'
import { Colors, auth } from '../../../../config'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { useEffect } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { database } from '../../../../config/firebase'
const Single_chat = (props) => {
  const {Name,photoUrl,phoneNo,Uid}=props
  const navigation = useNavigation()
  const [Overlay_profile,set_Overlay_profile]=useState(false)
  const [new_message, set_new_message] = useState(null)
  const [unread_count,set_unread_count]=useState('')

  const toggle_overlay_profile=()=>{
    set_Overlay_profile(!Overlay_profile)
  }
  useEffect(()=>{
    const docId = Uid >auth.currentUser.uid ? auth.currentUser.uid+'-'+ Uid : Uid +'-'+ auth.currentUser.uid
    const myCollection = collection(database,'chatrooms',`${docId}`,'messages') 
    const q =query(myCollection,orderBy("createdAt",'desc'))
    onSnapshot(q, (querySnapshot) => {
      var unread_msg = 0
      const allmsg = querySnapshot.docs.map(docSnap => {
        const data = docSnap.data()
        if (data.createdAt &&data.isRecived == false && data.isRead == false && auth.currentUser.uid == data.recipientId) {
          unread_msg = unread_msg + 1
          return {
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt.toDate()
          }
        }
        
      }).filter(msg => msg)
      set_new_message(allmsg)
      set_unread_count(unread_msg)      
    })
  },[])
  
  return (
    <>
    <TouchableOpacity onPress={()=>{navigation.push('Chat_Screen',{
        uid:Uid,
        Name:Name,
        phoneNo:phoneNo,
        photoUrl:photoUrl,
      })}}>
    <View style={{ flex: 1, backgroundColor: '#fff'}}>
    <View style={{flexDirection:"row",borderBottomWidth:1,borderBottomColor:Colors.margin,height:75}}>
     <TouchableOpacity onPress={toggle_overlay_profile}>
      <View style={{margin:10}}>
        <Avatar size={50} rounded source={{uri:`${photoUrl}`}}/>
      </View>
     </TouchableOpacity>
      <Overlay overlayStyle={{backgroundColor:'#00000000'}} isVisible={Overlay_profile} onBackdropPress={toggle_overlay_profile}>
      <View style={{margin:15}}>
        <Image
        source={{ uri:photoUrl }}
        style={{ width: 300, height: 300 }}
        />
      </View>
    </Overlay>
    <View style={{flexDirection:'column'}}>
     <View style={{marginTop:10,marginLeft:10}}>
        <Text style={{fontSize:15,fontWeight:'500'}}>{Name}</Text>
      </View>
      <View style={{marginLeft:10}}>
        {new_message && new_message[new_message.length - 1] ? 
        (<Text style={{maxWidth:180,lineHeight:25,maxHeight:25,color:Colors.mediumGray}}>
          {new_message[0].text}</Text>) : 
        (<Text>{phoneNo}</Text>)}
      </View>
    </View>
      {unread_count>0 && <View style={{position:'absolute',right:0,margin:25,borderRadius:200,backgroundColor:'#379237',width:25,height:25,justifyContent:'center',alignItems:'center'}}>
        <Text style={{color:"#fff",fontSize:12}}>{unread_count}</Text>
      </View>}

      
    </View>
  </View>
  </TouchableOpacity>
  </>)
}

export default Single_chat

const styles = StyleSheet.create({})