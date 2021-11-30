import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';
import { useCurrentActivity } from '../../context/activityContext';

const EditActivitiyForm = React.memo(props => {
    const [currentActivity, setCurrentActivity] = useCurrentActivity();
    const [editButtonLabel, setEditButtonLabel] = useState('Edit');
    const [newActivityName, setNewActivityName] = useState(currentActivity.name);
    const [editing, setEditing] = useState(false);;

    const onEditButton = () => {
        if (editButtonLabel === 'Done') {
            fetch('http://192.168.31.203:3030/', {
                method: 'PUT',
                body: JSON.stringify({ ...currentActivity, name: newActivityName }),
                headers: { 'Content-type': 'application/json' }
            })
                .then(() => {
                    setEditButtonLabel('Edit');
                    setEditing(false);
                });

        } else if (editButtonLabel === 'Edit') {
            setEditButtonLabel('Done');
            setEditing(true);
        };
    };

    const onDeleteActivity = () => {
        fetch(`http://192.168.31.203:3030/${currentActivity.id}`, {
            method: 'DELETE',
        })
            .then(() => props.closeForm());
    }

    return (
        <Modal animationType='slide' onRequestClose={props.closeForm}>
            <View style={styles.form}>
                {editing
                    ? <TextInput style={{ ...styles.text, backgroundColor: '#a7fcca' }} value={newActivityName} onChangeText={setNewActivityName} autoFocus={editing}></TextInput>
                    : <Text style={{ ...styles.text, backgroundColor: '#6a947c' }}>{newActivityName}</Text>}

                <View style={styles.buttonRow}>
                    <View style={styles.button}>
                        <Button title="Back to the list" onPress={props.closeForm} />
                    </View>
                    <View style={styles.button}>
                        <Button title={editButtonLabel} onPress={onEditButton} />
                    </View>
                </View>

                <View style={styles.buttonRow}>
                    <View style={styles.button}>
                        <Button title='Delete' color='#e65761' onPress={onDeleteActivity} />
                    </View>
                    <View style={styles.button}>
                        <Button color='#3cb531' title='Start' />
                    </View>
                </View>

            </View>
        </Modal>
    );
});

const styles = StyleSheet.create({
    form: {
        flex:1,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginBottom:'20%',
        justifyContent: 'center',
    },
    text: {
        borderColor: 'black',
        borderWidth: 2,
        width: 150,
        height: 30,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginBottom:'10%',
    },

    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 10
    },

    button: {

        width: 150,
        marginLeft: 10,
    }
})
export default EditActivitiyForm;
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

