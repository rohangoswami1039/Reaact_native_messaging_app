import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import * as Contacts from 'expo-contacts';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { Colors, auth } from '../../../config';
import { useState } from 'react';
import { database } from '../../../config/firebase';
import Main_Single_chat from './chat_components/Main_Single_chat'

const All_contacts = () => {
    const [contacts,set_contacts]=useState()
    const [number,set_numbers]=useState([])

   useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields:[Contacts.Fields.PhoneNumbers]
        });
        if(data.length>0){
          const numbers = new Set()
          data.forEach((contact)=>{
            if(contact.phoneNumbers){
              for(const phone of contact.phoneNumbers){
                numbers.add(phone.number)
              }
            }                
          })
          const results = await Promise.all([...numbers].map(async (number)=>{
            const docRef = doc(database,'users',`${number}`)
            const docSnap = await getDoc(docRef)
            if(docSnap.exists()){
              return docSnap.data()
            } else {
              return null
            }
          }))
          set_numbers(results.filter(item=>item!==null))
        }          
      }
    })();
  }, []);
     
  return (
    <View style={{flex:1}}>
       <FlatList
        data={number}
        ListEmptyComponent={<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator size={'large'} color={Colors.primary}/>
        </View>}
        renderItem={({item})=>{
          if(item.PhoneNo == auth.currentUser.phoneNumber){
            return (null)
          }
          return(
            <TouchableOpacity onPress={()=>{navigation.push('Chat_component',{
              uid:item.uid,
              photoUrl:item.Photo_Url,
              phoneNo:item.PhoneNo,
              Name:item.Name 
            })}}>
              <Main_Single_chat Name={item.Name} photoUrl={item.Photo_Url} phoneNo={item.PhoneNo} uid={item.uid} sender_uid={auth.currentUser.uid}/>
            </TouchableOpacity>
          )
        }}
       />
      </View>
)
}

export default All_contacts

const styles = StyleSheet.create({})