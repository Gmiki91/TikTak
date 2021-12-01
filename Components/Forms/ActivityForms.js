import React from 'react';
import {Modal} from 'react-native';
import AddActivityForm from './AddActivityForm';
import EditActivityForm from './EditActivityForm';

const ActivityForms = props => {
    console.log(`[ActivityForms] ${props.type}`);
    let form;
    switch (props.type) {
        case 'ADD':
            form = <AddActivityForm closeForm = {props.closeForm}/>;
            break;
        case 'EDIT':
            form = <EditActivityForm closeForm = {props.closeForm}/>;
            break;
        default:
            null;
    };

    return (
        <Modal animationType='slide' onRequestClose={props.closeForm}>
            {form}
        </Modal>
    );
};

export default ActivityForms;