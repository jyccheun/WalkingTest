import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import useStepTracker from './hooks/useStepTracker';
import * as Updates from 'expo-updates'

export default function App() {
  const [enabled, setEnabled] = useState(false)

  const [updateAvailable, setUpdateAvailable] = useState(false)

  useEffect(() => {
      Updates.checkForUpdateAsync().then(result => {
        if (result.isAvailable) {
          setUpdateAvailable(true)
        }
      })
  }, [])

  const { steps, reset, updateTime } = useStepTracker(enabled)

  return (
    <View style={styles.container}>
      <Text>Walk! And watch this go up: {steps}</Text>
      <Text>Last updated steps: {updateTime.toUTCString()}</Text>
      <View style={{ height: 20 }} />
      <Button onPress={reset} title="Reset"/>
      <View style={{ height: 20 }} />
      <Button onPress={() => setEnabled(v => !v)} title={enabled ? 'Disable' : 'Enable'} />
      <View style={{ height: 20 }} />
      <Text>update available: {updateAvailable}</Text>
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
