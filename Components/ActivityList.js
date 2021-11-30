import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useCurrentActivity } from '../context/activityContext';

const ActivityList = props =>{

    const [currentActivity, setCurrentActivity] = useCurrentActivity();

    const activityClicked = useCallback(element => {
        console.log(element);
        setCurrentActivity(element);
    },[]);
 
    return (
    <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: '30%', alignItems: 'center' }}>
        {props.list.map(element => (
             <TouchableOpacity key={element.id} onPress={()=>activityClicked(element)}>
             <Text style={styles.text}>{element.name}</Text>
             </TouchableOpacity>
        ))}
    </ScrollView>
);}

const styles = StyleSheet.create({
    container: {
        width: '60%',
        marginBottom: '5%',
        padding: '5%',
        backgroundColor: '#6a947c',
        borderColor: 'black',
        borderWidth: 3,
        borderRadius: 9,
    },
    text: {
        padding: 5,
        fontWeight: 'bold',
        fontSize: 16
    }
})

export default ActivityList;