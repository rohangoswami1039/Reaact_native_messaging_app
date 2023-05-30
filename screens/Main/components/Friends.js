import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, database } from '../../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Colors } from '../../../config';
import Friends_single_chat from './chat_components/Friends_single_chat';

const Friends = () => {
    const [friends,set_friends]=useState([])
    const renderItem = ({ item }) => {
         return(
           <Friends_single_chat Name={item.Name} photoUrl={item.Photo_Url} phoneNo={item.PhoneNo} Uid={item.id} />
         )
       };
    useEffect(() => {
        const fetchRequests = async () => {
          const querySnapshot = await getDocs(collection(database,'users',`${auth.currentUser.phoneNumber}`,'Friends'));
          const data = querySnapshot.docs.map((doc) => ({ id: doc.id,...doc.data() }));
          console.log(data)
          set_friends(data)
          
        };
    
        fetchRequests();
      }, []);
  return (
    <View>
      <FlatList
        data={friends}
        renderItem={renderItem}
        ListEmptyComponent={<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator size={'large'} color={Colors.primary}/>
        </View>}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

export default Friends

const styles = StyleSheet.create({})