import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { Colors } from '../config';
import { View } from './View';
import AnimatedLottieView from 'lottie-react-native';

export const LoadingIndicator = () => {

  return (
    <View style={styles.container}>
      <AnimatedLottieView
      autoPlay
      style={{
       width: 400,
       height: 400,
       backgroundColor: '#fff',
     }}source={require('../assets/social-media.json')}
    />    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
