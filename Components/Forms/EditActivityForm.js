import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Pressable } from 'react-native';
import { useCurrentActivity } from '../../context/activityContext';

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
                <View style={styles.button}>
                    <Button title='Edit' onPress={onEditClicked} />
                </View>
                <View style={styles.button}>
                    <Button title='Start' onPress={() => props.startActivity(currentActivity)} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({


    text: {
        backgroundColor: 'white',
        width: 180,
        height: 70,
        fontSize: 16,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 26
    },

    buttonContainer: {
        marginTop: '20%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        width: 70

    }
})
export default React.memo(EditActivitiyForm);
/*   const [editable, setEditable] = useState(false);
   const [label, setLabel] = useState();
   const visible = props.activity !== null;
   const labelInput = visible ? props.activity.name : 'error';
   const editLabel = editable ? 'Ok' : 'Edit';

   const deleteActivity = () => {
       alert(`Are you sure you want to delete`);
       props.closeForm();
   }

   const changeLabel = () => {
       if (editable) {
           fetch('http://192.168.31.203:3030/', {
               method: 'PUT',
               body: JSON.stringify({ ...props.activity, name: label }),
               headers: { 'Content-type': 'application/json' }
           })
               .then(() => {
                   setEditable(prevstate => !prevstate);
               });
       } else {
           setEditable(prevstate => !prevstate);
       }
   }

   return (
       <Modal visible={visible} animationType='slide'>
           <View style={styles.form}>
               {editable ? <TextInput value={} onChangeText={setLabel}></TextInput> : <Text>{label}</Text>}
               <Button title={editLabel} onPress={changeLabel} />
               <Button title='Cancel' onPress={props.closeForm} />
               <Button title='Delete' onPress={deleteActivity} />
               <Button title='Start' />
           </View>
       </Modal>
   )*/

