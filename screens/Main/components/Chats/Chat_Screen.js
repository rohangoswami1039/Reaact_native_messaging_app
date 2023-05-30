import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, auth } from '../../../../config'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import { useNavigation } from '@react-navigation/native'
import { Avatar, Button, Overlay } from '@rneui/base'
import { GiftedChat,Bubble,InputToolbar,Send} from 'react-native-gifted-chat'
import { collection, doc,getDocs,onSnapshot, orderBy, query, serverTimestamp, setDoc} from 'firebase/firestore'
import { database, db,  storage } from '../../../../config/firebase'
import { ActivityIndicator } from 'react-native'
import { onValue,ref } from 'firebase/database'
import { getDownloadURL, ref as ref_storage, uploadBytes } from 'firebase/storage'


import * as ImagePicker from 'expo-image-picker'
import * as DocumentPicker from 'expo-document-picker'
import { KeyboardAvoidingView } from 'react-native'




const Chat_Screen = (props) => {
    const navigation = useNavigation()
    const {Name,phoneNo,photoUrl,uid}=props.route.params
    const [messages, setMessages] = useState([]);
    const [onlineStatus, setOnlineStatus] = useState(null);
    const [showMenu, setshowMenu] = useState(false);
    const [text,set_text]=useState('')
    const [loading,set_loading]=useState(false)
    
    //constants for attachments
    const [image, setImage] = useState(null);
    const [video,setVideo]=useState(null)
    const [pdf,setPdf]=useState(null)
    const [image_link,set_image_link]=useState(null)
    const [visible_image,set_visible_image]=useState(false)
    const [image_text,set_image_text]=useState('')


    //functions for setting all the messages 
    const set_all_msg = ()=>{
      
    }

    //functions for reading all the messages
    const read_all_msg = async ()=>{
      const docId = uid >auth.currentUser.uid ? auth.currentUser.uid+'-'+ uid : uid +'-'+ auth.currentUser.uid
      const myCollection = collection(database,'chatrooms',`${docId}`,'messages')
      await getDocs(myCollection).then((E)=>{
        E.forEach((e)=>{
          console.log(e.data())
        })
      })
    }

    useEffect(() => {
      const onlineRef = ref(db, `/online/${uid}`);
      onValue(onlineRef, (snapshot) => {
        const onlineTime = snapshot.val();
        const isOnline = onlineTime && Date.now() - onlineTime < 1000;
        setOnlineStatus(isOnline ? 'Online' : `${new Date(onlineTime).toLocaleString()}`);
      });
      const docId = uid >auth.currentUser.uid ? auth.currentUser.uid+'-'+ uid : uid +'-'+ auth.currentUser.uid
      const myCollection = collection(database,'chatrooms',`${docId}`,'messages') 
      const q =query(myCollection,orderBy("createdAt",'desc'))
      onSnapshot(q,(querrySnap )=>{
        const allmsg = querrySnap.docs.map((docSnap) =>{
          const data = docSnap.data()
          if (data.createdAt){
            return {
              ...docSnap.data(),
              createdAt:docSnap.data().createdAt.toDate()
            }
          }
          else {
            return {
              ...docSnap.data(),
              createdAt:new Date()
            }
          }
        })
        setMessages(allmsg)
      })
    }, [])
const onSend = async (messages) =>{
  const msg = messages[0]
  const mymsg = {
    ...msg,
    sentBy:auth.currentUser.uid,
    recipientId:uid,
    isSent:true,
    isRecived:false,
    audio:'',
    image:'',
    isRead:false,
    createdAt:new Date()
  }
  setMessages(previousMessages => GiftedChat.append(previousMessages,mymsg))
  const docId = uid >auth.currentUser.uid ? auth.currentUser.uid + '-'+ uid : uid +'-'+ auth.currentUser.uid
  const myCollection = collection(database,'chatrooms',`${docId}`,'messages')
  const docRef = doc(myCollection)
  await setDoc(docRef,{...mymsg,createdAt:serverTimestamp()})
}

const Send_image = async(messages)=>{
  const msg = messages[0]
  const mymsg = {
    ...msg,
    sentBy:auth.currentUser.uid,
    recipientId:uid,
    isSent:true,
    text:image_text,
    isRecived:false,
    audio:'',
    image:'',
    isRead:false,
    createdAt:new Date()
  }
  setMessages(previousMessages => GiftedChat.append(previousMessages,mymsg))
  const docId = uid >auth.currentUser.uid ? auth.currentUser.uid + '-'+ uid : uid +'-'+ auth.currentUser.uid
  const myCollection = collection(database,'chatrooms',`${docId}`,'messages')
  const docRef = doc(myCollection)
  await setDoc(docRef,{...mymsg,createdAt:serverTimestamp()})

}

const toggleOverlay_image = ()=>{
  set_loading(true)
  set_visible_image(!visible_image)
}
const toggleOverlay_image_cancel = ()=>{
  set_visible_image(!visible_image)
  set_loading(false)
}
const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
        });
        console.log(result)
        if (!result.cancelled) {
          setImage(result.uri);
          toggleOverlay_image()
          
      }
    };
  
  const pickVideo = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Videos,
          allowsEditing: true,
          quality: 1,
        });
        if (!result.cancelled) {
          setVideo(result.uri);
        }
      };
  const pickDocument = async ()=>{
    let result = await DocumentPicker.getDocumentAsync()
    if(result.type=='success'){
      setPdf(result.uri)
   }
  }

    

      const handleImageSelect = ()=>{

      }
      const renderAttachmentMenu = ()=> {
        return (
          <View style={styles.attachmentMenuContainer}>
            <TouchableOpacity onPress={pickImage} style={styles.attachmentMenuItem}>
              <FontAwesome5 name="image" onPress={pickImage}  size={24} color={Colors.primary} />
              <Text style={styles.attachmentMenuItemText}>Photos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={pickVideo} style={styles.attachmentMenuItem}>
              <Entypo name="video" onPress={pickVideo}  size={24} color={Colors.primary} />
              <Text style={styles.attachmentMenuItemText}>Videos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={pickDocument} style={styles.attachmentMenuItem}>
              <Ionicons onPress={pickDocument} name="ios-document-attach-outline" size={24} color={Colors.primary} />
              <Text style={styles.attachmentMenuItemText}>Document</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.push('Pick_contact')}} style={styles.attachmentMenuItem}>
              <MaterialIcons  name="person" size={24} color={Colors.primary} />
              <Text style={styles.attachmentMenuItemText}>Contact</Text>
            </TouchableOpacity>
          </View>
        );
      }
      const renderChatFooter = () => {
        return (        
            <ImageBackground
              source={require('../../../../assets/background.jpg')}
              style={styles.backgroundImage}
            />
        );
      }      
      const renderInputToolbar = props => {
        return (
          <>
          
          <InputToolbar
            {...props}
            containerStyle={{ borderTopColor: Colors.primary }}>
            <View style={{flexDirection:'row'}}>
            { text=='' &&
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={{margin:10}} onPress={()=>{setshowMenu(!showMenu)}}>
              <Entypo name="attachment" size={24} color={Colors.mediumGray} />
            </TouchableOpacity>
            
            <TouchableOpacity style={{margin:10}} onPress={handleImageSelect}>
              <Entypo name="camera" size={24} color={Colors.mediumGray} />
            </TouchableOpacity>
            
     
            </View>
            }
            <TouchableOpacity >
              <Send {...props}>
                <Ionicons style={{margin:5}} name="send" size={30} color={Colors.primary} />
              </Send>
            </TouchableOpacity>
            </View>
          </InputToolbar>
          </>
        );
      };

    return (
   <>
   <View style={styles.container}>
       <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <Feather  onPress={()=>{navigation.pop()}} style={{marginLeft:10,marginTop:45}} name="arrow-left" size={27} color={Colors.white} />
        <TouchableOpacity onPress={()=>{navigation.push('Chat_Profile')}}>
            <View style={styles.Logo_container}>
            <View style={{marginRight:10}}>
                <Avatar rounded={true} size={45} source={{uri:photoUrl}}/>
            </View>
            <View>
                <Text style={styles.Logo_text}>{Name}</Text>
                <Text style={{marginBottom:10,color:Colors.white,fontSize:12}}>{onlineStatus}</Text>
            </View>
            </View>
       </TouchableOpacity>
       <View style={styles.Logo_container_icons}>
        {/** Icons on the chat top bar  */}
        <TouchableOpacity>
          <Entypo  style={{marginTop:10}} name="dots-three-vertical" size={20} color={Colors.white} />
        </TouchableOpacity>
        

        </View>
       </View>
     </View>
     <View style={{flex:1}}>
      {loading && <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'#00000000',height:'100%'}}>
              <ActivityIndicator size={'large'}/>
              </View>}
      <KeyboardAvoidingView behavior='padding'>
      <Overlay overlayStyle={{backgroundColor:'white',width:'100%'}} isVisible={visible_image}>
      <View style={{backgroundColor:'white',margin:10}}>
          <Image style={{width:'100%',height:500}} source={{uri:image}}/>
      </View>
      <KeyboardAvoidingView behavior='padding'>
      <View style={{margin:10}}>
        <TextInput onChangeText={(E)=>{set_image_text(E)}} placeholder='Enter Your Message... '/>        
      </View>
    </KeyboardAvoidingView>
      <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
        <Button type='clear' title={'cancel'} onPress={toggleOverlay_image_cancel}/>
        <Button type='clear' title={'send'} onPress={Send_image}/>
      </View>
    </Overlay>
    </KeyboardAvoidingView>
     {showMenu && renderAttachmentMenu()}
<View style={{flex:1}}>
  <ImageBackground
      source={require('../../../../assets/background.jpg')}
      style={styles.backgroundImage}/>
        <GiftedChat 
            scrollToBottom={true}
            renderAvatar={null}
            alignTop={true}
            isAnimated
            infiniteScroll={true}
            renderInputToolbar={renderInputToolbar}
            alwaysShowSend={true}
            onInputTextChanged={(e)=>{set_text(e)}}
            renderBubble={(props)=>{
              return <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: Colors.chat_color
                }
              }}
            />
            }}
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth.currentUser.uid,
            }}
            renderLoading={() => {
              return (
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <ActivityIndicator size={'large'}/>
              </View>)
            }}
        />
        </View>
      <KeyboardAvoidingView />
     </View>
   </>
  )
}

export default Chat_Screen

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
        fontSize:16,
      },
      Logo_container_icons:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        paddingTop:40,
        paddingLeft:10,
        marginLeft:25
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
      },
      inputIcon: {
        marginRight: 10,
      },
      input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: '#f2f2f2',
      },
      attachmentMenuContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#f9f9f9',
      },
      attachmentMenuItem: {
        alignItems: 'center',
      },
      attachmentMenuItemText: {
        marginTop: 5,
        fontSize: 12,
        color: 'grey',
      },
      backgroundImage: {
        resizeMode:'cover',
        position:'absolute',
        zIndex:-1,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
})