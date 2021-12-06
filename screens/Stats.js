import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import * as ApiCalls from '../Utility/ApiCalls'
import * as Color from '../Utility/Colors'
import StatControls from '../Components/StatControls';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryLabel } from 'victory-native';

const Stats = () => {
  const [loading, setloading] = useState(true)
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
  const [data, setData] = useState([])


  useEffect(() => {
    let mounted = true;
    setloading(true);
    ApiCalls.getAllActivities().then(result => {
      if (mounted) {
        setloading(false)
      }
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
      console.log(activityTimePairs);
      setData(activityTimePairs);
    });
    return () => {
      mounted = false
    }
  }, [date, filter]);

  const chart = data.length > 0 ?
    <VictoryChart
      width={350}
      theme={VictoryTheme.material}
      domainPadding={25}
    >
      <VictoryAxis
      />
      <VictoryAxis
        style={{
          axisLabel: { padding: 36 },
          tickLabels: { padding: 8 }
        }}
        dependentAxis

      />
      <VictoryBar

        data={data}
        x="name"
        y="time"
        barRatio={0.7}
        style={{
          data: {
            fill: ({ index }) => index % 2 === 1 ? Color.mainBorder : Color.modalBorder
          }
        }}
      />
    </VictoryChart> : <Text style={{ marginTop: '50%', textAlign: 'center' }}>No data recorder for this timeperiod</Text>;
    
  const displayChart = loading ?  <ActivityIndicator style={{ marginTop: '50%'}}  size="large" color={Color.modalBorder} /> : chart;
  return (

    <View style={styles.container}>
      {displayChart}
      <View style={styles.controls}>
      <StatControls
        changeDate={(day, month, year) => setDate(`${year}-${month}-${day}`)}
        changeFilter={setFilter}
        period={filter}
      />
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  controls: {
    flex: 1,
    justifyContent: 'flex-end'
  }
})

export default Stats;