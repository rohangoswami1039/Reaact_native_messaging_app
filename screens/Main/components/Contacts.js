import { ActivityIndicator, FlatList, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../../config'
import { useNavigation } from '@react-navigation/native'

import { auth, database, db } from '../../../config/firebase'

import { useWindowDimensions } from 'react-native'
import { TabBar, TabView } from 'react-native-tab-view'

import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import All_contacts from './All_contacts'
import Friends from './Friends'


const All_Contacts = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
    const navigation = useNavigation()

    const [routes] = React.useState([
      { key: 'first', title: 'Friends' },
      { key: 'second', title: 'All Contacts' },
      ]);
  
    const FirstRoute = () => (
      <Friends/>
    );

    const SecondRoute = () => (
      <All_contacts/>
    );

    const renderTabBar = props => (
    <TabBar
      {...props}
      renderLabel={({route, color}) => (
        <>
        {route.title=='All Contacts' && <View style={{flex:1,flexDirection:'row',justifyContent:"center",alignItems:'center'}}>
        <MaterialCommunityIcons name="contacts" size={22} color={Colors.white} />   
          <Text style={{ color: 'white', marginLeft: 5,fontWeight:'500',fontSize:14 }}>
            {route.title}
          </Text>
        </View>}
        {route.title=='Friends'&&<View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <FontAwesome5 name="user-friends" size={22} color={Colors.white} />   
          <Text style={{ color: 'white',marginLeft: 5,fontWeight:'500',fontSize:14 }}>
            {route.title}
          </Text>
        </View>}
        
      </>
      )}
      indicatorStyle={{ backgroundColor: Colors.secondary,height:5,borderRadius:25 }}
      style={{ backgroundColor: Colors.primary, }}
    /* onTabPress={(scene) => {
        const { route } = scene
        props.jumpTo('first')
        console.log(props.jumpTo(route.key))
      }}*/
    />
    );




    return (
    <>
    <View style={styles.container}>
       <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
       <View style={styles.Logo_container}>
         <Feather  onPress={()=>{navigation.pop()}} style={{marginRight:10}} name="arrow-left" size={27} color={Colors.white} />
         <Text style={styles.Logo_text}>{'Contacts'}</Text>
       </View>
       <View style={styles.Logo_container_icons}>
        <Feather  onPress={()=>{ToastAndroid.show("Search button",ToastAndroid.SHORT)}} style={{marginRight:10}} name="search" size={20} color={Colors.white} />
        <Feather  onPress={()=>{ToastAndroid.show("Refresh button",ToastAndroid.SHORT)}} style={{marginRight:10}} name="refresh-ccw" size={20} color={Colors.white} />
        <Entypo  onPress={()=>{ToastAndroid.show("Three dots button",ToastAndroid.SHORT)}} style={{marginRight:10}} name="dots-three-vertical" size={20} color={Colors.white} />
       </View>
       </View>
     </View>
     <TabView
      navigationState={{ index, routes }}
      renderScene={({route})=>{
        switch(route.key){
          case 'first':
            return FirstRoute()
          case 'second':
            return SecondRoute()
          default:
            return null 
        }
      }}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width}}
    />
   
    </>
  )
}

export default All_Contacts

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