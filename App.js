
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions} from 'react-native';
import Bird from './components/Bird';
import Obstacles from './components/Obstacles';

export default function App() {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
  const birdLeft = screenWidth / 2;
  const [birdBottom, setBirdBottom] = useState(screenHeight/2);
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth);
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(screenWidth + screenWidth/2 + 30);
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(Math.random() * 100);
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(Math.random() * 100);
  const obstacleWidth = 60;
  const obstacleHeight = 300;
  const gap = 200;
  const gravity = 3;
  let gameTimerId;
  let obstaclesLeftTimerId;
  let obstaclesLeftTimerIdTwo;

  //start bird falling
  useEffect(() => {
    if (birdBottom > 0 ) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity)
      }, 30)
      return () => {
        clearInterval(gameTimerId)
      } 
    }
  }, [birdBottom])
console.log(birdBottom);
// start first obstacles
useEffect(() => {
  if(obstaclesLeft > -obstacleWidth){
    obstaclesLeftTimerId = setInterval(() => {
      setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5)
    }, 30)
  
  return () => {
    clearInterval(obstaclesLeftTimerId)
   }
  } else {
    setObstaclesLeft(screenWidth)
    setObstaclesNegHeight(- Math.random() * 100)
    setObstaclesNegHeightTwo(- Math.random() * 100)
  }
  
}, [obstaclesLeft])
// start second obstacles
useEffect(() => {
  if(obstaclesLeftTwo > -obstacleWidth){
    obstaclesLeftTimerIdTwo = setInterval(() => {
      setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5)
    }, 30)
  
  return () => {
    clearInterval(obstaclesLeftTimerIdTwo)
   }
  } else {
    setObstaclesLeftTwo(screenWidth)
  }
  
}, [obstaclesLeftTwo])
//check for collisions
useEffect(() => {
    if((birdBottom < (obstaclesNegHeight + obstaclesHeight + 30) ) || birdBottom > (obstaclesNegHeight + obstaclesHeight + gap -30) && (obstaclesLeft > screenWidth/2 -30 && obstaclesLeft < screenWidth/2 + 30)
  ) || (birdBottom < (obstaclesNegHeightTwo + obstaclesHeight + 30) ) || birdBottom > (obstaclesNegHeightTwo + obstaclesHeight + gap -30) && (obstaclesLeftTwo > screenWidth/2 -30 && obstaclesLeftTwo < screenWidth/2 + 30)
  )
  {
  console.log('game over')
  gameOver()
  }
},[])

  return (
    <View style={styles.container}>
      <Bird 
        birdBottom={birdBottom}
        birdLeft={birdLeft}
      />
      <Obstacles
        color={'green'}
        obstacleWidth={obstacleWidth}
        obstacleHeight={obstacleHeight}
        obstaclesLeft={obstaclesLeft}
        randomBottom={obstaclesNegHeight}
        gap={gap}
      />
      <Obstacles
        color={'yellow'}
        obstacleWidth={obstacleWidth}
        obstacleHeight={obstacleHeight}
        obstaclesLeft={obstaclesLeftTwo}
        randomBottom={obstaclesNegHeightTwo}
        gap={gap}
      />
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
