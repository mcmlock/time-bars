import React, { useState } from 'react';
import { StyleSheet, Modal, Text, View, TouchableOpacity, Keyboard } from 'react-native';
import DayPicker from '../DayPicker';
import { editRepeatDay } from '../../resources/storageFunctions';

export const EditRepeatDay = ({ visible, toggleModal, selectTimeBar, selectedTimeBar, timeBars, setTimeBars, setOrder }) => {

    const [newRepeatDay, setNewRepeatDay] = useState(selectedTimeBar.repeatDay);

    const resetModal = () => {
        setNewRepeatDay(selectedTimeBar.repeatDay);
    }

    return (
        <Modal visible={visible} onPress={Keyboard.dismiss}>
            <View style={styles.modalView}>
                <View style={styles.contentView}>
                    <DayPicker repeatDay={newRepeatDay} setRepeatDay={setNewRepeatDay} />
                    <TouchableOpacity
                        style={{ marginBottom: 30 }}
                        onPress={() => {
                            editRepeatDay(selectedTimeBar, timeBars, setTimeBars, setOrder, newRepeatDay, selectTimeBar, toggleModal);
                        }}
                    >
                        <Text style={{ fontSize: 20.0, alignSelf: 'center' }}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            resetModal();
                            toggleModal(false);
                        }}
                    >
                        <Text style={{ fontSize: 20.0, alignSelf: 'center' }}>Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 50.0,
    },
    contentView: {
        borderWidth: 1,
        paddingHorizontal: 40,
        paddingVertical: 20,
        borderRadius: 5,
        borderColor: 'black',
        color: 'red'
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30.0,
    },
});