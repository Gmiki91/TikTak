import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as ApiCalls from '../Utility/ApiCalls'
import StatControls from '../Components/StatControls';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';

const Stats = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  /*
  filter:
  0 - day selected
  1 - month selected
  2 - year selected
  */
  const [filter, setFilter] = useState(0);

  /*
  data pl:
  Array [
    Object {
      "name": "Alvás",
      "time": 2,
    },
    Object {
      "name": "pam kutya",
      "time": 16,
    },
  ]
  */
  const [data, setData] = useState(null)


  useEffect(() => {
    ApiCalls.getAllActivities().then(result => {
      const activityTimePairs = [];
      result.forEach(activity => {
        const name = activity.name;
        const time = +activity.timestamps
          .filter(timestamp => {
            switch (filter) {
              case 0: return timestamp.date === date;
              case 1: return timestamp.date.slice(0, 7) === date.slice(0, 7);
              case 2: return timestamp.date.slice(0, 4) === date.slice(0, 4);
              default: throw new Error();
            }
          })
          .reduce((sum, timestamp) => sum + timestamp.time, 0);
        if (time > 0) {
          activityTimePairs.push({ name: name, time: time })
        }
      });
      setData(activityTimePairs);
    });
  }, [date, filter]);

  const chart = data ? <VictoryChart width={350} theme={VictoryTheme.material}>
    <VictoryBar data={data} x="name" y="time" />
  </VictoryChart> : null;

  return (

    <View>
      {chart}
      <StatControls
        changeDate={(day, month, year) => setDate(`${year}-${month}-${day}`)}
        changeFilter={setFilter}
        period={filter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  controlContainer: {
    marginTop: '10%',
    width: '50%'
  }
})

export default Stats;
