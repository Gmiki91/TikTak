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
        <Modal animationType='slide' onRequestClose={props.closeForm}>
          
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter activity"
                    value={input}
                    onChangeText={setInput}
                ></TextInput>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                    <Button
                            title="Cancel"
                            onPress={props.closeForm}
                        />
                        
                    </View>
                    <View style={styles.button}>
                    <Button
                            title="Enter"
                            onPress={() => addActivity(input)}
                        />
                    </View>
                </View>
            </View>
         
        </Modal>
    );
});

const styles = StyleSheet.create({

    form: {
        alignItems: 'center',
        justifyContent: 'center',
        flex:1,
    },
    buttonContainer: {
        width: '70%',
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button:{
       width: 70
    },
    input: {
        backgroundColor:'white',
        width: '80%',
        height: 50,
        fontSize: 16,
        textAlign: 'center',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius:26
    }
})

export default AddActivityForm;