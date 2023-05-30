import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { Colors } from '../../../config'

const Notification = (props) => {
  return (
    <>
   <View style={styles.container}>
      <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
      <View style={styles.Logo_container}>
        <Feather  onPress={()=>{props.navigation.pop()}} style={{marginRight:10}} name="arrow-left" size={27} color={Colors.white} />
        <Text style={styles.Logo_text}>{'Notification'}</Text>
      </View>
      <View style={styles.Logo_container_icons}>
     
      </View>
      </View>
    </View>
   </>
  )
}

export default Notification

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