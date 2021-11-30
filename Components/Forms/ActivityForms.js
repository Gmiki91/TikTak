import React from 'react';
import {View} from 'react-native';
import AddActivityForm from './AddActivityForm';
import EditActivityForm from './EditActivityForm';

const ActivityForms = props => {
    console.log(`[ActivityForms] ${props.type}`);
    let form;
    switch (props.type) {
        case 'ADD':
            form = <AddActivityForm closeForm={props.closeForm} />;
            break;
        case 'EDIT':
            form = <EditActivityForm closeForm={props.closeForm}/>;
            break;
        default:
            null;
    };

    return (
        <View>
            {form}
        </View>
    );
};

export default ActivityForms;