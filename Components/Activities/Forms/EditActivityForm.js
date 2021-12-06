import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, Pressable } from 'react-native';
import * as ApiCalls from '../../../Utility/ApiCalls';
import { useCurrentActivity } from '../../../context/activityContext';
import AppButton from '../../UI/AppButton';

const EditActivitiyForm = props => {
    const [currentActivity, setCurrentActivity] = useCurrentActivity();
    const [newActivityName, setNewActivityName] = useState(currentActivity.name);
    const [editing, setEditing] = useState(false);;

    const checkIfEdited = () => {
        if (currentActivity.name !== newActivityName) {
            fetch('http://192.168.31.203:3030/', {
                method: 'PUT',
                body: JSON.stringify({ ...currentActivity, name: newActivityName }),
                headers: { 'Content-type': 'application/json' }
            })
                .then(response => response.json())
                .then((result) => {
                    setEditing(false);
                    Alert.alert('Change saved', '', [{ text: 'Very well' }], { cancelable: true });
                    setCurrentActivity(result)
                });

        } else {
            Alert.alert('Nothing changed', '', [{ text: 'Such is life' }], { cancelable: true });
            setEditing(false);
        }
    }

    const onEditClicked = () => {
        editing ? checkIfEdited() : setEditing(true);
    }

    const onDeleteClicked = () => {
        ApiCalls.deleteActivity(currentActivity).then(resolved => {
            props.closeForm()
        })
            .catch(rejected => {console.log(`not deleted ${rejected}`) }) //not deleted
    }

    return (
        <View style={styles.form}>
            {editing
                ? <TextInput
                    style={{ ...styles.text, backgroundColor: 'white' }}
                    value={newActivityName}
                    onChangeText={setNewActivityName}
                    autoFocus={editing}
                    onBlur={checkIfEdited}
                ></TextInput>
                : <Pressable style={{ height: 70 }} underlayColor="#DDDDDD" onLongPress={() => setEditing(true)}>
                    <Text style={{ ...styles.text, backgroundColor: '#bbbfbf' }}>{newActivityName}</Text>
                </Pressable>}

            <View style={styles.buttonContainer}>
                <AppButton title='Edit' onPress={onEditClicked} />
                <AppButton title='Delete' onPress={onDeleteClicked} />
                <AppButton title='Start' onPress={props.startActivity} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    form:{
        width:'75%',
        alignItems: 'center',
    },
    text: {
        backgroundColor: 'white',
        width: 180,
        height: 70,
        fontSize: 24,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 26,
        padding:20
    },

    buttonContainer: {
        marginTop: '20%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})
export default React.memo(EditActivitiyForm);
