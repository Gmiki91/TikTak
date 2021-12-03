import React from 'react';
import { View, Text, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Color from '../../Utility/Colors'

const Selector = props => {

    return (
        <View style={{ flexDirection: 'row', margin: '5%' }}>
            <Pressable disabled={props.disabled} onPress={() => props.change(-1)}>
                <Text>
                    <MaterialCommunityIcons color={props.disabled ? '#bfbfbf' : Color.modalBorder} size={30} name="arrow-left-thick" />
                </Text>
            </Pressable>
            <Pressable>
                <Text style={{ 
                    width: 120, 
                    fontSize: 20, 
                    height: 30, 
                    textAlignVertical: 'center', 
                    textAlign: 'center', 
                    borderColor: props.disabled ? '#787878' : Color.mainBorder, 
                    backgroundColor: props.disabled ? '#bfbfbf' : 'white',
                    color: props.disabled ? 'white' : 'black',
                    borderWidth: 1, 
                    borderRadius: 20 }}>
                    {props.value}
                </Text>
            </Pressable>
            <Pressable disabled={props.disabled} onPress={() => props.change(1)}>
                <Text>
                    <MaterialCommunityIcons color={props.disabled ? '#bfbfbf' : Color.modalBorder} size={30} name="arrow-right-thick" />
                </Text>
            </Pressable>
        </View>
    )
}
export default Selector