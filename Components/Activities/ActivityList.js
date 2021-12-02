import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, TouchableHighlight, Text } from 'react-native';
import { useCurrentActivity } from '../../context/activityContext';
import * as ApiCalls from '../../Utility/ApiCalls';
import * as Color  from '../../Utility/colors';

const ActivityList = props => {
    const [currentActivity, setCurrentActivity] = useCurrentActivity();

    const activityClicked = useCallback(element => {
        console.log(element);
        setCurrentActivity(element);
    }, []);

    const onDeleteClicked = activity => {
        ApiCalls.deleteActivity(activity).then(() => {
            props.listChanged();
        })
            .catch(rejected => {console.log(`not deleted because ${rejected}`) }) 
    }
    
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: '30%', alignItems: 'center' }}>
            {props.list.map(element => (
                <TouchableHighlight 
                style={{ width: '100%' }} 
                underlayColor="#DDDDDD" 
                key={element._id} 
                onLongPress={()=>onDeleteClicked(element)} 
                onPress={() => activityClicked(element)}>
                    <Text style={styles.text}>{element.name}</Text>
                </TouchableHighlight>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        marginBottom: '10%',
        padding: '5%',
        backgroundColor:'white',
        borderColor: Color.mainBorder,
        borderWidth: 5,
        borderRadius: 30,
    },
    text: {
        textAlign: 'center',
        padding: 5,
        fontWeight: 'bold',
        textDecorationLine:'underline',
        fontSize: 24
    }
})

export default ActivityList;