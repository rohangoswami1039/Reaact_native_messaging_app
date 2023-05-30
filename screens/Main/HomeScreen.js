import React, { useState } from 'react';
import { View, StyleSheet, Button, useWindowDimensions, Text, TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth, Colors } from '../../config';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Chat from './Chat';
import Stories from './Stories';
import { Names } from '../../config/theme';


import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

const FirstRoute = () => (
    <Chat/>
);

const SecondRoute = () => (
  <Stories/>
);

const renderTabBar = props => (
  <TabBar
    {...props}
    renderLabel={({route, color}) => (
      <>
      {route.title=='Chats' && <View style={{flex:1,flexDirection:'row',justifyContent:"center",alignItems:'center'}}>
      <Entypo name="chat" size={22} color={Colors.white} />   
        <Text style={{ color: 'white', marginLeft: 5,fontWeight:'500',fontSize:14 }}>
          {route.title}
        </Text>
      </View>}
      {route.title=='Feeds'&&<View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
      <FontAwesome name="th-large" size={22} color={Colors.white} />   
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

export const HomeScreen = (props) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
  { key: 'first', title: 'Chats' },
  { key: 'second', title: 'Feeds' },
  ]);
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);


  return (
    <>
    <View style={styles.container}>
      <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
      <View style={styles.Logo_container}>
        <Text style={styles.Logo_text}>{Names.App_name}</Text>
      </View>
      <View style={styles.Logo_container_icons}>
        <TouchableOpacity>
          <Feather name="search" size={22} color={Colors.white} />
        </TouchableOpacity>
        <TouchableOpacity  onPress={showMenu}>
          <Entypo name="dots-three-vertical" size={22} color={Colors.white} />
          <Menu
            visible={visible}
            onRequestClose={hideMenu}
            style={{width:180}}
            animationDuration={0}
          >
          <MenuItem onPress={()=>{props.navigation.replace('Requests')}}>Requests</MenuItem>
          <MenuItem >New Group</MenuItem>
          <MenuItem >New Post</MenuItem>
          <MenuItem >Mute Notification</MenuItem>
          <MenuDivider />
          <MenuItem onPress={()=>{props.navigation.replace('Settings')}}>Settings</MenuItem>
        </Menu>
        </TouchableOpacity>
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
  );
};

const styles = StyleSheet.create({
 container: {
    backgroundColor: Colors.primary,
    height:90
  },
  Logo_container:{
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
    marginLeft:120
  },
});
