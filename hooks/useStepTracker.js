import React, { useRef, useState, useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Pedometer } from 'expo-sensors';
import { request, PERMISSIONS } from 'react-native-permissions';

export default function useStepTracker(enabled) {
  const [steps, setSteps] = useState(0)
  const [updateTime, setUpdateTime] = useState(new Date())
  const sentTimeRef = useRef(new Date())
  const subscriptionRef = useRef()

  useEffect(() => {
    subscriptionRef.current = Pedometer.watchStepCount(result => {
      if (enabled) {
        setSteps(result.steps)
      }
    })

    if (Platform.OS === 'android') {
      request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION)
    } else {
      request(PERMISSIONS.IOS.MOTION)
    }

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.remove()
      }
    }
  }, [enabled])

  useEffect(() => {
    setUpdateTime(new Date())
  }, [steps])

  useEffect(() => {
    console.log('steps: ' + steps + ' updatetime: ' + updateTime)
    if (updateTime - sentTimeRef.current > 60000) {
      console.log('send')
      sentTimeRef.current = new Date()

      reset()
    }
  }, [steps, updateTime])

  const reset = () => {
    subscriptionRef.current.remove()
    subscriptionRef.current = Pedometer.watchStepCount(result => setSteps(result.steps))
  }

  return {
    steps, reset, updateTime,
  };
}
