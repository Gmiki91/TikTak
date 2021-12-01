import React, { useState, useCallback } from 'react';
import { View, TextInput, StyleSheet, Button, Modal } from 'react-native';

const AddActivityForm = React.memo(props => {
    const [input, setInput] = useState('');

    const addActivity = useCallback((value) => {
        fetch('http://192.168.31.203:3030/', {
            method: 'POST',
            body: JSON.stringify({ name: value }),
            headers: { 'Content-type': 'application/json' }
        })
            .then(() => props.closeForm());
    }, []);

    return (
       
          
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter activity"
                    value={input}
                    onChangeText={setInput}
                ></TextInput>
              
                    <View style={styles.button}>
                    <Button
                            title="Enter"
                            onPress={() => addActivity(input)}/>
               
                </View>
            </View>
         
    
    );
});

const styles = StyleSheet.create({

    
    button:{
       marginTop:'10%',
    },
    input: {
        backgroundColor:'white',
        width: 180,
        height: 50,
        fontSize: 16,
        textAlign: 'center',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius:26
    }
})

export default AddActivityForm;