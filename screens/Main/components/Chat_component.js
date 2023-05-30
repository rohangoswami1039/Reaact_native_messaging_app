import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import { Colors } from '../../../config'
import { useNavigation } from '@react-navigation/native'

const Chat_component = (props) => {
  const { uid,photoUrl,phoneNo,Name,sender_uid } = props.route.params
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
    <View style={styles.Logo_container}>
      <Feather  onPress={()=>{navigation.pop()}} style={{marginRight:10,marginTop:10}} name="arrow-left" size={27} color={Colors.white} />
      <View style={{flexDirection:'column'}}>
        <TouchableOpacity>
          <Text style={styles.Logo_text}>{Name}</Text>
          <Text style={{color:Colors.white,marginLeft:10,marginBottom:10}}>{'Online'}</Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.Logo_container_icons}>
     <Feather  onPress={()=>{ToastAndroid.show("Search button",ToastAndroid.SHORT)}} style={{marginRight:10}} name="search" size={20} color={Colors.white} />
     <Feather  onPress={()=>{ToastAndroid.show("Refresh button",ToastAndroid.SHORT)}} style={{marginRight:10}} name="refresh-ccw" size={20} color={Colors.white} />
     <Entypo   onPress={()=>{ToastAndroid.show("Three dots button",ToastAndroid.SHORT)}} style={{marginRight:10}} name="dots-three-vertical" size={20} color={Colors.white} />
    </View>
    </View>
  </View>
  )
}

export default Chat_component

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
    marginLeft:85,
    marginBottom:10
  },
})