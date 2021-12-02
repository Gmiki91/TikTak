import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
const StatControls = () =>(
    <View style={styles.container}>
        <View style={styles.row}>
            <Text>Daily x</Text>
            <Text>19</Text>
        </View>
        <View style={styles.row}>
            <Text>Monthly x</Text>
            <Text>November</Text>
        </View>
        <View style={styles.row}>
            <Text>yearly x</Text>
            <Text>2021</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    }
});

export default StatControls;