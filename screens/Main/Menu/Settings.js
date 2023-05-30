import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { auth, Colors } from '../../../config'
import { Names } from '../../../config/theme'
import { Avatar } from '@rneui/base/dist/Avatar/Avatar'


const Settings = (props) => {
  return (<>
    <View style={styles.container}>
      <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
      <View style={styles.Logo_container}>
        <Feather  onPress={()=>{props.navigation.replace('Home')}} style={{marginRight:10}} name="arrow-left" size={27} color={Colors.white} />
        <Text style={styles.Logo_text}>{'Settings'}</Text>
      </View>
      <View style={styles.Logo_container_icons}>
     
      </View>
      </View>
    </View>
    
    <View style={{paddingTop:10,paddingLeft:10,flexDirection:'row',height:100,borderBottomWidth:2,borderColor:Colors.margin}}>
      <TouchableOpacity onPress={()=>{props.navigation.push('Profile')}}>
        <Avatar
        size={80}
        rounded
        source={{uri:auth.currentUser.photoURL}}
        />
      </TouchableOpacity> 
       <View style={{paddingTop:15,alignItems:'flex-start',flexDirection:'column'}}>
        <Text style={{fontSize:16,fontWeight:'500', marginLeft:20}}>{auth.currentUser.displayName}</Text>
        <Text style={{fontSize:14, marginLeft:20}}>{auth.currentUser.phoneNumber}</Text>
       </View>

       <View style={{flex:1,margin:20,justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity>
          <FontAwesome name="qrcode" size={27} color={Colors.mediumGray} />         
          </TouchableOpacity>
       </View>
    </View>
    <View style={{flex:1,marginTop:20}}>
      {/** Account Section */}
      <TouchableOpacity onPress={()=>{props.navigation.push('Account')}}>
      <View style={{height:80,marginBottom:20}}>
        <View>
          <View style={{flexDirection:'row'}}>
            <FontAwesome style={{marginTop:15,paddingLeft:20}}  name="user" size={27} color={Colors.mediumGray} />         
            <Text  style={{fontSize:16,paddingLeft:30,paddingTop:10,fontWeight:'400'}}>Account</Text>
          </View>
        <Text style={{fontSize:14,paddingLeft:70,color:Colors.mediumGray}}>Security notification, Change Number</Text>
        </View>
      </View>
      </TouchableOpacity>

         {/** Privacy Section */}
      <TouchableOpacity onPress={()=>{props.navigation.push("Privacy")}}>
      <View style={{height:80,marginBottom:20}}>
        <View>
          <View style={{flexDirection:'row'}}>
            <FontAwesome style={{marginTop:15,paddingLeft:20}} name="lock" size={27} color={Colors.mediumGray} />         
            <Text  style={{fontSize:16,paddingLeft:30,paddingTop:10,fontWeight:'400'}}>Privacy</Text>
          </View>
        <Text style={{fontSize:14,paddingLeft:70,color:Colors.mediumGray}}>Block contacts, profile, Groups</Text>
        </View>
      </View>
      </TouchableOpacity>
         {/** Notification Section */}
      <TouchableOpacity onPress={()=>{props.navigation.push('Notification')}}>
      <View style={{height:80,marginBottom:20}}>
        <View>
          <View style={{flexDirection:'row'}}>
            <FontAwesome style={{marginTop:15,paddingLeft:20}} name="bell" size={20} color={Colors.mediumGray} />         
            <Text  style={{fontSize:16,paddingLeft:30,paddingTop:10,fontWeight:'400'}}>Notification</Text>
          </View>
        <Text style={{fontSize:14,paddingLeft:70,color:Colors.mediumGray}}>Message,Group & call tones</Text>
        </View>
      </View>
      </TouchableOpacity>

      {/** help Section */}
      <TouchableOpacity onPress={()=>{props.navigation.push("Help")}}>
      <View style={{height:80,marginBottom:20}}>
        <View>
          <View style={{flexDirection:'row'}}>
            <Feather style={{marginTop:15,paddingLeft:20}} name="help-circle" size={27} color={Colors.mediumGray} />         
            <Text style={{fontSize:16,paddingLeft:30,paddingTop:10,fontWeight:'400'}}>help</Text>
          </View>
        <Text style={{fontSize:14,paddingLeft:75,color:Colors.mediumGray}}>Help Center,Contact us,Privacy policy</Text>
        </View>
      </View>
      </TouchableOpacity>
    </View>
    <View style={{bottom:10,alignItems:'center',justifyContent:'center'}}>
      <Text style={{color:Colors.mediumGray}}>Created by:</Text> 
      <Text style={{color:Colors.mediumGray}}>Rohan Goswami </Text>
    </View>
    </>)
}

export default Settings

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