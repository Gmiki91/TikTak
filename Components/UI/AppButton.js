import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const AppButton = props => (
        <Pressable disabled={props.disabled} style={{...styles.button, backgroundColor:props.disabled?'#787878' : '#fc470a', ...props.style}} {...props}>
            <Text style={{ fontSize: 24, textAlign: 'center', color:props.disabled ? '#383838': 'black' }}>{props.title}</Text>
        </Pressable>
    )


const styles = StyleSheet.create({
    button: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        backgroundColor: '#fc470a',
        borderRadius: 28,
        padding: 10,
        
    }
})
export default AppButton;
