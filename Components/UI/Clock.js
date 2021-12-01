import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Clock = (props) => {
    const hour = Math.floor(props.time / 3600);
    const displayHour = hour >= 1 ? <Text className="digits">
        {("0" + Math.floor(props.time / 3600)).slice(-2)}:
    </Text>
        : null;
    return (
        <View style={styles.timer}>
            {displayHour}
            <Text >
                {("0" + Math.floor(props.time / 60) % 60).slice(-2)}:
            </Text>

            <Text >
                {("0" + Math.floor(props.time % 60)).slice(-2)}
            </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    timer: {
        flexDirection: 'row'
    },

})

export default Clock;