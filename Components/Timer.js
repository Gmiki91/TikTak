import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, BackHandler, Alert } from 'react-native';
import { useCurrentActivity } from '../context/activityContext';
import Clock from './UI/Clock';
import AppButton from './UI/AppButton';

const Timer = props => {
  const [currentActivity, setCurrentActivity] = useCurrentActivity();
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  const [hourlyCheck, setHourlyCheck] = useState(1);


  const backAction = () => {
    handlePauseResume();
    Alert.alert("Hold on!", "Unsaved time will be lost!", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "I don't care, I do what I want!", onPress: props.back },
      { text: "Fine, save the time first", onPress: handleStop }
    ], { cancelable: true });
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  useEffect(() => {
    let interval = null;
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        let seconds;
        setTime(sec => {
         seconds=sec+1;
          return seconds
        });
        if (seconds / 3600 >= hourlyCheck) {
          handlePauseResume();
          setHourlyCheck(hour => hour + 1)
          alert('Take a break!');
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);


  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
  
    setIsPaused(prevstate=>!prevstate);
  };

  const handleStop = () => {
    fetch('http://192.168.31.203:3030/timer', {
      method: 'PUT',
      body: JSON.stringify({ activity: currentActivity, time: time }),
      headers: { 'Content-type': 'application/json' }
    })
      .then(() => props.back());
  }

  const startButton = (
    <View style={styles.buttonContainer}>
      <AppButton title={'Start'} onPress={handleStart} />
    </View>
    );

  const activeButtons = (<View style={styles.buttonContainer}>
    <AppButton title={isPaused ? 'Resume' : 'Pause'} onPress={handlePauseResume} />
    <AppButton disabled={!isPaused} title={'Save'} onPress={handleStop} />
  </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.textContainer}>{currentActivity.name}</Text>
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
  textContainer:{
    fontSize: 32,
    marginBottom:'15%'
  },
  buttonContainer: {
    width: '50%',
    marginTop: '20%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})
export default Timer;
