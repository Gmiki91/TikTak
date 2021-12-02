import React, { useState, useCallback } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import AppButton from '../../UI/AppButton';

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
        <View >
            <TextInput
                style={styles.input}
                placeholder="Enter activity"
                value={input}
                onChangeText={setInput}
            ></TextInput>
            <AppButton
                title="Enter"
                onPress={() => addActivity(input)} />
        </View>
    );
});

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        width: 180,
        height: 50,
        fontSize: 24,
        textAlign: 'center',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 26,
        marginBottom: '15%',
    }
})

export default AddActivityForm;