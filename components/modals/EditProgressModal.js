import React, { useState } from 'react';
import { StyleSheet, Modal, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { editProgress } from '../../resources/storageFunctions';

export const EditProgressModal = ({ visible, toggleModal, selectedTimeBar, selectTimeBar, timeBars, setTimeBars, setOrder }) => {

    const [updatedHours, setUpdatedHours] = useState(selectedTimeBar.completedHours);
    const [updatedMinutes, setUpdatedMinutes] = useState(selectedTimeBar.completedMinutes);

    const resetModal = () => {
        setUpdatedHours(selectedTimeBar.completedHours);
        setUpdatedHours(selectedTimeBar.completedMinutes);
    }

    return (
        <Modal visible={visible} onPress={Keyboard.dismiss}>
            <View style={styles.modalView}>
                <View style={styles.contentView}>
                    <View style={styles.inputRow}>
                    <TextInput
                            placeholder='HH'
                            placeholderTextColor="#444"
                            keyboardType='number-pad'
                            style={styles.textInput}
                            maxLength={2}
                            value={`${updatedHours}`}
                            onChangeText={value => setUpdatedHours(value)}
                        />
                        <Text style={{ fontSize: 26.0, paddingHorizontal: 8.0, fontWeight: 'bold' }}>:</Text>
                        <TextInput
                            placeholder='MM'
                            placeholderTextColor="#444"
                            keyboardType='number-pad'
                            style={styles.textInput}
                            maxLength={2}
                            value={`${updatedMinutes}`}
                            onChangeText={value => setUpdatedMinutes(value)}
                        />
                    </View>
                    <TouchableOpacity
                        style={{ marginHorizontal: 50.0, justifyContent: 'center', alignItems: 'center', marginBottom: 30, width: 50, height: 50 }}
                        onPress={() => {
                            updatedHours === '' ? setUpdatedHours(0) : setUpdatedHours(Number(updatedHours));
                            updatedMinutes === '' ? setUpdatedMinutes(0) : setUpdatedMinutes(Number(updatedMinutes));
                            editProgress(selectedTimeBar, timeBars, setTimeBars, setOrder, updatedHours, updatedMinutes, selectTimeBar, toggleModal);
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
    textInput: {
        paddingHorizontal: 8.0,
        paddingVertical: 6.0,
        borderRadius: 4.0,
        fontSize: 25.0,
        borderStyle: 'solid',
        borderColor: "black",
        borderWidth: 1,
    }

});