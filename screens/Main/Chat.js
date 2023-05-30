import { ActivityIndicator, Button, FlatList, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'



import { Colors, auth } from '../../config';
import View_story from './View_story';
import { FAB } from '@rneui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import Friends_single_chat from './components/chat_components/Friends_single_chat';
import { database } from '../../config/firebase';
import Single_chat from './components/chat_components/Single_chat';
import Stories from './Stories';
import FloatingButton from './components/chat_components/FloatingButton';

const Chat = (props) => {
  const navigation = useNavigation()

  const [friends,set_friends]=useState([])

    const renderItem = ({ item }) => {
         return(
           <Single_chat Name={item.Name} photoUrl={item.Photo_Url} phoneNo={item.PhoneNo} Uid={item.id} />
         )
       };
    useEffect(() => {
        const fetchRequests = async () => {
          const querySnapshot = await getDocs(collection(database,'users',`${auth.currentUser.phoneNumber}`,'Friends'));
          const data = querySnapshot.docs.map((doc) => ({ id: doc.id,...doc.data() }));
          set_friends(data)
          
        };
    
        fetchRequests();
      }, []);

  return (
  <>
    <View style={{flex:1}}>
    <FlatList
        data={friends}
        renderItem={renderItem}
        ListEmptyComponent={<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator size={'large'} color={Colors.primary}/>
        </View>}
        keyExtractor={(item) => item.id}
      />
    </View>
    <View >
     <FloatingButton/>
    </View>
  </>
  )
}

export default Chat

const styles = StyleSheet.create({})
/**
 *  <FAB buttonStyle={{backgroundColor:Colors.primary}}
           icon={<MaterialCommunityIcons name='chat' color={Colors.white} size={25}/>}
           onPress={()=>{navigation.push('Contacts')}}/>
 */