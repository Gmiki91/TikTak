import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, TouchableHighlight, Text, Alert } from 'react-native';
import { useCurrentActivity } from '../context/activityContext';

const ActivityList = props => {

    const [currentActivity, setCurrentActivity] = useCurrentActivity();

    const activityClicked = useCallback(element => {
        console.log(element);
        setCurrentActivity(element);
    }, []);

    const deleteActivity = activity => {
        Alert.alert(`Are you sure you want to delete ${activity.name}?`, '', [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            {
                text: "Delete", onPress: () => {
                    fetch(`http://192.168.31.203:3030/${activity._id}`, { method: 'DELETE' })
                        .then(props.listChanged());
                }
            }
        ],
            { cancelable: true })
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: '30%', alignItems: 'center' }}>
            {props.list.map(element => (
                <TouchableHighlight style={{ width: '100%' }} underlayColor="#DDDDDD" key={element._id} onLongPress={() => deleteActivity(element)} onPress={() => activityClicked(element)}>
                    <Text style={styles.text}>{element.name}</Text>
                </TouchableHighlight>
            ))}
        </ScrollView>
    );
}

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
        textAlign: 'center',
        padding: 5,
        fontWeight: 'bold',
        fontSize: 16
    }
})

export default ActivityList;