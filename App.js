import React, { useRef, useState, useEffect } from 'react';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import { Pedometer } from 'expo-sensors';
import { request, PERMISSIONS } from 'react-native-permissions';

export default function App() {
  const [currentStepCount, setCurrentStepCount] = useState(0)
  const subscriptionRef = useRef()

  useEffect(() => {
    subscriptionRef.current = Pedometer.watchStepCount(result => setCurrentStepCount(result.steps))

    if (Platform.OS === 'android') {
      request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION)
    } else {
      request(PERMISSIONS.IOS.MOTION)
    }

    return () => {
      subscriptionRef.current.remove()
    }
  }, [])

  const reset = () => {
    setCurrentStepCount(0)
    subscriptionRef.current.remove()
    subscriptionRef.current = Pedometer.watchStepCount(result => setCurrentStepCount(result.steps))
  }

  return (
    <View style={styles.container}>
      <Text>Walk! And watch this go up: {currentStepCount}</Text>
      <Button onPress={reset} title="Reset"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
