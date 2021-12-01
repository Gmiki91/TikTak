import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text,Button, View } from 'react-native';
import { useCurrentActivity } from '../context/activityContext';

const Timer = props => {

  const [currentActivity, setCurrentActivity] = useCurrentActivity();

    return (
      props.show ? 
        <View style={styles.screen}>
        <Text>Timer</Text>
        </View>
        :null
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: '20%',
        marginBottom: '10%',
        
    },
});
export default Timer;

/*

  const [addVisibility, setAddVisibility] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);





  const addActivity = useCallback(value => {
    fetch('http://192.168.31.203:3030/', {
      method: 'POST',
      body: JSON.stringify({ name: value }),
      headers: { 'Content-type': 'application/json' }
    })
      .then(() => {
        getList();
        setAddVisibility(prevState => !prevState);
      });
  }, []);

  return (
    <View style={styles.screen}>

        <EditActivitiyForm
        activity={currentActivity}
        closeForm={() => setCurrentActivity(null)}

      />

      <AddActivityForm
        show={addVisibility}
        nameEntered={addActivity}
        closeForm={() => setAddVisibility(prevState => !prevState)}
      />

    </View>
  );
}
*/
