import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import Selector from './UI/Selector';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const thirtyDayMonths = ['February', 'April', 'June', 'September', 'November'];
const thisYear = +new Date().toISOString().slice(0, 4);
const thisMonth = +new Date().toISOString().slice(5, 7);
const today = +new Date().toISOString().slice(8, 10);

const StatControls = props => {
    const [day, setDay] = useState(today);
    const [month, setMonth] = useState(months[thisMonth - 1]);
    const [year, setYear] = useState(thisYear);

    const data = [
        { label: 'Daily', value: 0 },
        { label: 'Monthly', value: 1 },
        { label: 'Yearly', value: 2 },
    ];

    useEffect(() => {
        props.changeDate(
            ('0'+day).slice(-2),
            ('0'+(months.indexOf(month)+1)).slice(-2),
            year);
    }, [day, month, year]);

    useEffect(() => {
        const maxDay = getMaxDay();
        if (day > maxDay) {
            setDay(maxDay);
        }
    }, [month, year])

    const change = (type, amount) => {
        switch (type) {
            case 'day':
                changeDay(amount);
                break;
            case 'month':
                changeMonth(amount);
                break;
            case 'year':
                setYear(prevstate => prevstate + amount);
                break;
            default:
        }
    }

    const changeMonth = (amount) => {
        const originalIndex = months.indexOf(month);
        const changedIndex = originalIndex + amount;
        if (changedIndex > 11) {
            setMonth(months[0]);
        } else if (changedIndex < 0) {
            setMonth(months[11]);
        } else {
            setMonth(months[changedIndex]);
        }
    }

    const changeDay = (amount) => {
        const maxDay = getMaxDay();
        if (day + amount > maxDay) {
            setDay(1);
        } else if (day + amount < 1) {
            setDay(maxDay)
        } else {
            setDay(prevstate => prevstate + amount);
        }
    }

    const getMaxDay = () => {
        if (thirtyDayMonths.indexOf(month) > -1) {
            if (month === 'February') {
                if (new Date(year, 1, 29).getMonth() == 1) {
                    return 29;
                } else {
                    return 28;
                }
            } else {
                return 30;
            }
        } else {
            return 31;
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.column}>
                <RadioForm
                    radio_props={data}
                    initial={props.period}
                    onPress={(value) => props.changeFilter(value) } />
            </View>
            <View style={styles.column}>
                <Selector type={'day'} value={day} change={(amount) => change('day', amount)} disabled={props.period > 0} />
                <Selector type={'month'} value={month} change={(amount) => change('month', amount)} disabled={props.period > 1} />
                <Selector type={'year'} value={year} change={(amount) => change('year', amount)} />
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    column: {
        flexDirection: 'column',

    },

});

export default StatControls;