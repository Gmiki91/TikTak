import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import * as ApiCalls from '../Utility/ApiCalls'
import { useIsFocused } from '@react-navigation/native'
import StatControls from '../Components/StatControls';
const Stats = () => {
  const isFocused = useIsFocused();

  useEffect(() => {
    ApiCalls.getAllActivities().then(result => {
      const today = new Date().toISOString().slice(0, 10);
      const activityTimePairs = [];

      result.forEach(activity => {
        const name = activity.name;
        const time = +activity.timestamps
          .filter(timestamp => timestamp.date === today)
          .map(timestamp => timestamp.time).join(' ');
        if (time > 0) {
          activityTimePairs.push({ name: name, time: time })
        }
      });
      
      console.log(activityTimePairs);
    });
  }, [isFocused]);

  return (
    <StatControls />
  );
}

export default Stats;

/*
Array [
  Object {
    "__v": 0,
    "_id": "61a937840f6373b6f56a3074",
    "name": "Alvás",
    "timestamps": Array [],
  },
  Object {
    "__v": 0,
    "_id": "61a93b720f6373b6f56a307b",
    "name": "zum",
    "timestamps": Array [],
  },
  Object {
    "__v": 0,
    "_id": "61a93b90e0f3222b826f7dac",
    "name": "pam kutya",
    "timestamps": Array [],
  },
]
*/