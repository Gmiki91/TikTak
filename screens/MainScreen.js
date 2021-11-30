import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { useCurrentActivity } from '../context/activityContext';
import ActivityForms from '../Components/Forms/ActivityForms';
import ActivityList from '../Components/ActivityList';

const MainScreen = () => {
  const [currentActivity, setCurrentActivity] = useCurrentActivity();
  const [activityList, setActivityList] = useState([]);
  const [formType, setFormType] = useState();

  // Init activity list
  useEffect(() => {
    console.log("[useEffect]: initList");
    getList();
  }, [formType]);

  const getList = useCallback(() => {
    console.log("[useCallback]: getList");
    fetch('http://192.168.31.203:3030/')
      .then(response => response.json())
      .then(response => {
        const list = response.map(activity => {
          return {
            name: activity.name,
            id: activity._id
          }
        });
        setActivityList(list);
      });
  }, []);

  // Check if an activity is selected and show modal in that case
  useEffect(() => {
    console.log("[useEffect]: getActivity");
    if (currentActivity) {
      setFormType('EDIT');
    }
  }, [currentActivity]);


  return (
    formType == 'EDIT' || formType == 'ADD' ?
      <ActivityForms type={formType} closeForm={() =>{
        setFormType('');
        setCurrentActivity(null);
      }} /> :
      <View style={styles.main}>
        <ActivityList
          list={activityList} />
        <Button
          title="Add new Activity"
          onPress={() => setFormType('ADD')}
        />
      </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex:1,
    height:'50%',
    alignItems: 'center',
    justifyContent:'center',
    marginBottom: '20%',
    marginTop: '30%',
  }
})
export default MainScreen;