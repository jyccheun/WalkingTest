import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Pedometer } from 'expo-sensors';
import { request, PERMISSIONS } from 'react-native-permissions';

export default function App() {
  const [currentStepCount, setCurrentStepCount] = useState(0)

  useEffect(() => {
    const subscription = Pedometer.watchStepCount(result => setCurrentStepCount(result.steps))

    if (Platform.OS === 'android') {
      request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION)
    } else {
      request(PERMISSIONS.IOS.MOTION)
    }

    return () => {
      subscription.remove()
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text>Walk! And watch this go up: {currentStepCount}</Text>
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
