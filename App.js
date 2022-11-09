import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import useStepTracker from './hooks/useStepTracker';

export default function App() {
  const [enabled, setEnabled] = useState(false)

  const { steps, reset, updateTime } = useStepTracker(enabled)

  return (
    <View style={styles.container}>
      <Text>Walk! And watch this go up: {steps}</Text>
      <Text>Last updated: {updateTime.toUTCString()}</Text>
      <Button onPress={reset} title="Reset"/>
      <Button onPress={() => setEnabled(v => !v)} title={enabled ? 'Disable' : 'Enable'} />
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
