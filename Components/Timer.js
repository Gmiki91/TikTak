import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, Button, View, BackHandler } from 'react-native';
import { useCurrentActivity } from '../context/activityContext';
import Clock from './UI/Clock';

const Timer = props => {
  const [currentActivity, setCurrentActivity] = useCurrentActivity();
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  const [hourlyCheck, setHourlyCheck] = useState(1);

  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime(sec => {
          if (sec / 3600 > hourlyCheck) {
            setHourlyCheck(hour => hour + 1)
          }
          return sec + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  useEffect(() => {
    if (hourlyCheck > 1) {
      handlePauseResume();
      alert('Take a break!');
    }
  }, [hourlyCheck]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    fetch('http://192.168.31.203:3030/timer', {
      method: 'PUT',
      body: JSON.stringify({activity:currentActivity, time:time}),
      headers: { 'Content-type': 'application/json' }
    })
      .then(response => setCurrentActivity(null));
  }

  const startButton = (<Button title={'Start'} onPress={handleStart} />)
  const activeButtons = (
    <View style={styles.buttonContainer}>
      <Button title={isPaused ? 'Resume' : 'Pause'} onPress={handlePauseResume} />
      <Button title={'Stop'} onPress={handleStop} />
    </View>
  )

  return (
    <View style={styles.container}>
      <Clock time={time} />
      {isActive ? activeButtons : startButton}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {

  }
})
export default Timer;
