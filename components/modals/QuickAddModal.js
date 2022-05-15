import React, { useState } from 'react';
import { StyleSheet, Modal, Text, View, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { quickAdd } from '../../resources/storageFunctions';

export const QuickAddModal = ({ visible, toggleQuickAdd, selectedTimeBar, timeBars, setTimeBars, setOrder }) => {

    const [hourInput, setHourInput] = useState('');
    const [minuteInput, setMinuteInput] = useState('');

    const resetModal = () => {
        setHourInput('');
        setMinuteInput('');
    }

    return (
        <Modal visible={visible}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalView}>
                <View style={styles.contentView}>
                    <View style={styles.inputRow}>
                        <TextInput
                            placeholder='HH'
                            placeholderTextColor="#444"
                            keyboardType='number-pad'
                            style={styles.textInput}
                            maxLength={2}
                            onChangeText={value => setHourInput(value)}
                        />
                        <Text style={{ fontSize: 26.0, paddingHorizontal: 8.0, fontWeight: 'bold' }}>:</Text>
                        <TextInput
                            placeholder='MM'
                            placeholderTextColor="#444"
                            keyboardType='number-pad'
                            style={styles.textInput}
                            maxLength={2}
                            onChangeText={value => setMinuteInput(value)}
                            onEndEditing={() => {
                                if (Number(minuteInput) < 10) {
                                    setMinuteInput(`0${minuteInput}`);
                                }
                                if (minuteInput === '') {
                                    setMinuteInput('00');
                                }
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        style={{ marginHorizontal: 50.0, justifyContent: 'center', alignItems: 'center', marginBottom: 30, width: 50, height: 50 }}
                        onPress={() => {
                            const hrsToAdd = hourInput ? Number(hourInput) : 0;
                            const minsToAdd = minuteInput ? Number(minuteInput) : 0;
                            quickAdd(selectedTimeBar, timeBars, setTimeBars, hrsToAdd, minsToAdd, toggleQuickAdd, setOrder);
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faPlus}
                            size={40}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            resetModal();
                            toggleQuickAdd(false);
                        }}
                    >
                        <Text style={{ fontSize: 20.0, alignSelf: 'center' }}>Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 50.0,
        //   backgroundColor: 'rgba(0, 0, 0, .5)',
        //     opacity: 0
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