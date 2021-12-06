import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import * as ApiCalls from '../Utility/ApiCalls'
import * as Color from '../Utility/Colors'
import StatControls from '../Components/StatControls';
import { VictoryPie } from 'victory-native';
import AppButton from '../Components/UI/AppButton';

const Stats = () => {
  const [loading, setloading] = useState(true)
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [showChart, setShowChart] = useState(false); // false - Numbers, true - Chart

  /*
  filter:
  0 - day selected
  1 - month selected
  2 - year selected
  */
  const [filter, setFilter] = useState(0);
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
      setData(activityTimePairs);
    });
    return () => {
      mounted = false
    }
  }, [date, filter]);

  const noData = <Text style={styles.text}>No data recorded for this timeperiod</Text>;
  const spinner = <ActivityIndicator style={{ marginTop: '50%' }} size="large" color={Color.modalBorder} />;
  const chart = data.length > 0 ?
    <VictoryPie
      x="name"
      y="time"
      radius={90}
      labelPlacement="perpendicular"
      colorScale={"warm"}
      data={data} />
    : noData;

  const dataNumbers = data.length > 0 ?
    <ScrollView style={{marginTop:'10%', marginLeft:'5%'}}>
      {data.map(adat => {
        let unit = 'minutes';
        let amount = (adat.time / 60).toFixed(1);
        if (adat.time > 3600) {
          unit = 'hours';
          amount = (adat.time / 3600).toFixed(1);
        } else if (adat.time > 86400) {
          unit = 'days';
          amount = (adat.time / 86400).toFixed(1);
        }
        return <Text key={adat.name}>{adat.name}: {amount} {unit} </Text>
      })}
    </ScrollView>
    : noData

  const displayChart = loading ? spinner : chart;
  const displayNumbers = loading ? spinner : dataNumbers;
  const display = showChart ? displayChart : displayNumbers;

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <AppButton title={showChart ? 'Chart' : 'Plain data'} onPress={()=>setShowChart(prevstate=>!prevstate)} />
      </View>
      <View style={styles.displayContainer}>
      {display}
      </View>
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
    marginTop: '8%',
    flex: 1,
    
  },
  buttonContainer:{
    alignItems: 'center',
 
  },
  displayContainer:{
    flex:2
  },
  controls: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  text: {
    marginTop: '50%',
    textAlign: 'center'
  }
})

export default Stats;