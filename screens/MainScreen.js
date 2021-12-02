import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useCurrentActivity } from '../context/activityContext';
import ActivityForms from '../Components/Forms/ActivityForms';
import ActivityList from '../Components/ActivityList';
import Timer from '../Components/Timer'
import AppButton from '../Components/UI/AppButton';

const MainScreen = () => {
  const [currentActivity, setCurrentActivity] = useCurrentActivity();
  const [activityList, setActivityList] = useState([]);
  const [formType, setFormType] = useState();
  const [startTimer, setStartTimer] = useState(false);

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
            _id: activity._id
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
    }else{
      closeForm();
    }
  }, [currentActivity]);

  const closeForm = () => {
    setFormType('');
    setStartTimer(false);
    setCurrentActivity(null);
  }
  
  const startActivity = ()=>{
    setStartTimer(true);
  }
 
  return (
    startTimer? <Timer back={closeForm}/>
    :<View style={styles.main}>
      <View style={styles.form}>
        <ActivityForms 
        type={formType} 
        closeForm={closeForm}
        startActivity={startActivity}/>
      </View> 
      <View style={styles.list}>
        <ActivityList
          list={activityList}
          listChanged={getList} />
        <AppButton
          title="Add new Activity"
          onPress={() => setFormType('ADD')}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
   
  },
  form:{
    
    flex:1
  },
  list: {
    alignItems: 'center',
    marginBottom: '20%',
    marginTop: '30%',
  }
})
export default MainScreen;