import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, TouchableHighlight } from 'react-native';
import { useCurrentActivity } from '../../context/activityContext';

const EditActivitiyForm = React.memo(props => {
    const [currentActivity, setCurrentActivity] = useCurrentActivity();
    const [newActivityName, setNewActivityName] = useState(currentActivity.name);
    const [editing, setEditing] = useState(false);;

    const checkIfEdited = () => {
        if(currentActivity.name !== newActivityName) {
            fetch('http://192.168.31.203:3030/', {
                method: 'PUT',
                body: JSON.stringify({ ...currentActivity, name: newActivityName }),
                headers: { 'Content-type': 'application/json' }
            })
                .then(() => setEditing(false))
        }else{
            setEditing(false);
        }
    }
    return (
     
            <View style={styles.form}>
                {editing
                    ? <TextInput 
                    style={{ ...styles.text, backgroundColor: '#a7fcca', height:30 }} 
                    value={newActivityName} 
                    onChangeText={setNewActivityName} 
                    autoFocus={editing}
                    onBlur={checkIfEdited} 
                    ></TextInput>
                    :   <TouchableHighlight style={{height:30}}  underlayColor="#DDDDDD" onLongPress={()=>setEditing(true)}>
                    <Text style={{ ...styles.text, backgroundColor: '#6a947c' }}>{newActivityName}</Text>
                    </TouchableHighlight>}
                
                    <View style={styles.button}>
                        <Button color='#3cb531' title='Start' />
                    </View>
       

            </View>
      
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
        height: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
    },

    button: {
        
        width: 150,
        marginTop: '10%'
        
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

