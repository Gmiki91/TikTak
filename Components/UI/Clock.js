import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CircularProgress from "./CircularProgress";


const Clock = (props) => {
    const percentage = 66;
    const seconds = ("0" + Math.floor(props.time % 60)).slice(-2);
    const secondPercentage = (seconds / 60) * 100;
    const minutes = ("0" + Math.floor(props.time / 60) % 60).slice(-2);
    const minutesPercentage = (minutes / 60) * 100;
    const hours = Math.floor(props.time / 3600);
    const displayHour = hours >= 1
        ? <CircularProgress
            size={100}
            strokeWidth={10}
            percentage={100}
            color="#b82c21"
            time={hours}
            unit={"hour"} />
        : null;
    return (
        <View style={styles.timer}>
            {displayHour}
            <CircularProgress
                size={100}
                strokeWidth={10}
                percentage={minutesPercentage}
                color="#b82c21"
                time={minutes}
                unit={"min"}
            />
            <CircularProgress
                size={100}
                strokeWidth={10}
                percentage={secondPercentage}
                color="#b82c21"
                time={seconds}
                unit={"sec"}
            />


        </View>
    );
}
const styles = StyleSheet.create({
    timer: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-around',
    },

})

export default Clock;