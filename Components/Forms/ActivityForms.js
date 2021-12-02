import React from 'react';
import { Modal, View, StyleSheet, Pressable } from 'react-native';
import AddActivityForm from './AddActivityForm';
import EditActivityForm from './EditActivityForm';
import * as Color from '../../Utility/colors'

const ActivityForms = props => {
    console.log(`[ActivityForms] ${props.type}`);
    let form;
    switch (props.type) {
        case 'ADD':
            form = <AddActivityForm closeForm={props.closeForm} />;
            break;
        case 'EDIT':
            form = <EditActivityForm closeForm={props.closeForm} startActivity={props.startActivity} />;
            break;
        default:
            null;
    };

    return (props.type ?
        <Modal transparent={true} animationType='slide' onRequestClose={props.closeForm}>
            <Pressable style={styles.backdrop} onPress={props.closeForm}>
                <View style={styles.form}>
                    {form}
                </View>
            </Pressable>
        </Modal>

        : null
    );
};

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(16, 20, 26,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        zIndex: 99
    },
    form: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 5,
        borderColor: Color.modalBorder,
        padding: '10%',
        backgroundColor: 'rgba(255, 255, 255,0.85)',
        borderRadius: 60

    },

})

export default ActivityForms;