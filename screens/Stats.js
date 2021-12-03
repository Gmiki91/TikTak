import React, { useEffect } from 'react';
import {StyleSheet, View} from 'react-native';
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

  const thisYear = +new Date().toISOString().slice(0, 4);
  const thisMonth = +new Date().toISOString().slice(5, 7);
  const today= +new Date().toISOString().slice(8, 10);

  return (
    <View>
    <StatControls year={thisYear} month={thisMonth} day={today}/>
    </View>
  );
}

const styles = StyleSheet.create({
  controlContainer: {
    marginTop: '20%',
    width: '50%'
  }
})

export default Stats;
