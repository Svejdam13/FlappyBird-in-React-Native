
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import Bird from './components/Bird';

export default function App() {
  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height
  const birdLeft = screenWidth / 2
  const [BirdBottom, setBirdBottom] = useState(screenHeight/2) 

  //start bird falling
  useEffect(() => {
    
  })

  return (
    <View style={styles.container}>
      <Bird />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
