import React, { useState } from 'react';
import { StyleSheet, Modal, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { editTitle } from '../../resources/storageFunctions';

export const EditTitleModal = ({ visible, toggleModal, selectedTimeBar, timeBars, setTimeBars, setOrder }) => {

    const [newTitle, setNewTitle] = useState(selectedTimeBar.title);

    const resetModal = () => {
        setNewTitle(selectedTimeBar.title);
    }

    return (
        <Modal visible={visible} onPress={Keyboard.dismiss}>
            <View style={styles.modalView}>
                <View style={styles.contentView}>
                    <View style={styles.inputRow}>
                        <TextInput
                            placeholder='New Title'
                            placeholderTextColor="#444"
                            style={styles.textInput}
                            value={newTitle}
                            onChangeText={value => setNewTitle(value)}
                        />
                    </View>
                    <TouchableOpacity
                        style={{ marginHorizontal: 50.0, justifyContent: 'center', alignItems: 'center', marginBottom: 30, width: 50, height: 50 }}
                        onPress={() => {
                            if (newTitle !== '') {
                                editTitle(selectedTimeBar, timeBars, setTimeBars, setOrder, newTitle, toggleModal);
                            }
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