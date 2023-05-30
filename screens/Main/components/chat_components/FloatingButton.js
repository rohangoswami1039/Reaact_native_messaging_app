import React, { useState} from "react";
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from "../../../../config";
import { useNavigation } from "@react-navigation/native";

const FloatingButton = (props) => {
  const navigation = useNavigation()
  const [icon_1] = useState(new Animated.Value(15));
  const [icon_2] = useState(new Animated.Value(15));
  const [icon_3] = useState(new Animated.Value(15));

  const [pop, setPop] = useState(false);

  const popIn = () => {
    setPop(true);
    Animated.timing(icon_1, {
      toValue: 120,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 90,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 130,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  const popOut = () => {
    setPop(false);
    Animated.timing(icon_1, {
      toValue: 15,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 15,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 15,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  return(
    <View style={{
      flex: 1
    }}>
      <Animated.View  style={[styles.circle, { bottom: icon_1}]}>
        <TouchableOpacity onPress={()=>{navigation.push('Contacts')}}>
          <Icon name="group" size={25} color="#FFFF" />
        </TouchableOpacity>
      </Animated.View>
        <TouchableOpacity>
      <Animated.View style={[styles.circle, { bottom: icon_2, right: icon_2}]}>
          <Icon name="edit" size={25} color="#FFFF" />
      </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity>
      <Animated.View style={[styles.circle, { right: icon_3}]}>
          <Icon name="camera" size={25} color="#FFFF" />
      </Animated.View>
        </TouchableOpacity>
      <TouchableOpacity
        style={styles.circle}
        onPress={() => {
          pop === false ? popIn() : popOut();
        }}
      >
        <Icon name="plus" size={25} color="#FFFF" />
      </TouchableOpacity>
    </View>
  )

}

export default FloatingButton;

const styles = StyleSheet.create({
  circle: {
     backgroundColor: Colors.primary,
     width: 60,
     height: 60,
     position: 'absolute',
     bottom: 15,
     right: 15,
     borderRadius: 50,
     justifyContent: 'center',
     alignItems: 'center',
  }
})