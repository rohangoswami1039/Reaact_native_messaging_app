import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar } from '@rneui/base'
import { Colors, auth } from '../../config'

const View_story = () => {
  return (
   <>
    <View>
        <View style={{borderBottomWidth:2,borderBottomColor:Colors.margin}}>
            {/** Make it flat list in vertical line Single View is designed here */}
            <View style={{margin:10}}>                
                <Avatar containerStyle={{borderColor:Colors.alert_green,borderRadius:100,borderWidth:2}}  size={50} rounded source={{uri:auth.currentUser.photoURL}}/>
            </View>
        </View>
    </View>
   </>
  )
}

export default View_story

const styles = StyleSheet.create({})