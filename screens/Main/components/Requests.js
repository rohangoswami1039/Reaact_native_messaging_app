import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '../../../config'
import Feather from 'react-native-vector-icons/Feather'
import { collection, getDocs } from 'firebase/firestore'
import { auth, database } from '../../../config/firebase'
import { useState } from 'react'
import Request_single_chat from './chat_components/Request_single_chat'


const Requests = (props) => {
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const fetchRequests = async () => {
      const querySnapshot = await getDocs(collection(database,'users',`${auth.currentUser.phoneNumber}`,'requests'));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id,...doc.data() }));
      console.log(data)
      setRequests(data);
    };

    fetchRequests();
  }, []);

  const renderItem = ({ item }) => {
   if(item.Status == 'Sent'){
    return(
      <Request_single_chat Name={item.Name} photoUrl={item.Photo_Url} phoneNo={item.PhoneNo} uid={item.id} Uid={item.uid} sender_uid={item.Sent_by}/>
    )
   }else {
    return null ;
   }
  };
  return (
   <>
    <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.Logo_container}>
            <Feather onPress={() => { props.navigation.replace('Home') }} style={{ marginRight: 10 }} name="arrow-left" size={27} color={Colors.white} />
            <Text style={styles.Logo_text}>{'Requests'}</Text>
          </View>
          <View style={styles.Logo_container_icons}>
          </View>
        </View>
      </View>

      <FlatList
        data={requests}
        renderItem={renderItem}
        ListEmptyComponent={<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator size={'large'} color={Colors.primary}/>
        </View>}
        keyExtractor={(item) => item.id}
      />


   </>
  )
}

export default Requests

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    height: 100,
  },
  Logo_container: {
    flexDirection: 'row',
    paddingTop: 50,
    paddingLeft: 10,
  },
  Logo_text: {
    color: Colors.white,
    fontSize: 19,
    fontWeight: '500',
    letterSpacing: 2,
  },
  Logo_container_icons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 50,
    paddingLeft: 10,
    marginLeft: 85,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
})