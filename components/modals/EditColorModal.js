import React, { useState } from 'react';
import { StyleSheet, Modal, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { editColor } from '../../resources/storageFunctions';

export const EditColorModal = ({ visible, toggleModal, selectTimeBar, selectedTimeBar, timeBars, setTimeBars, setOrder }) => {

    const [newColor, setNewColor] = useState(selectedTimeBar.color);

    const resetModal = () => {
        setNewColor(selectedTimeBar.color);
    }

    const ColorPicker = color => {
        const btnStyles = StyleSheet.create({
            activeColorBtn: {
                width: 45,
                height: 45,
                backgroundColor: color.color,
                borderWidth: 1.4
            },
            inactiveColorBtn: {
                width: 45,
                height: 45,
                backgroundColor: color.color,
            }
        });
        const btnStyle = newColor === color.color ? btnStyles.activeColorBtn : btnStyles.inactiveColorBtn;

        return (
            <TouchableOpacity
                style={{ marginHorizontal: 12.0 }}
                onPress={() => {
                    setNewColor(color.color)
                }}>
                <View style={btnStyle} />
            </TouchableOpacity>
        );
    }

    return (
        <Modal visible={visible} onPress={Keyboard.dismiss}>
            <View style={styles.modalView}>
                <View style={styles.contentView}>
                    <View style={styles.colorSelect}>
                        <View style={{ flexDirection: 'row' }}>
                            <ColorPicker color='#1fbaed' />
                            <ColorPicker color='#1fedce' />
                            <ColorPicker color='#901fed' />
                            <ColorPicker color='#1f4fed' />

                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 16.0 }}>
                            <ColorPicker color='#ed1f37' />
                            <ColorPicker color='#ed9e1f' />
                            <ColorPicker color='#eddf1f' />
                            <ColorPicker color='#ed1fce' />
                        </View>
                    </View>
                    <TouchableOpacity
                        style={{ marginBottom: 30 }}
                        onPress={() => {
                            editColor(selectedTimeBar, timeBars, setTimeBars, setOrder, newColor, selectTimeBar, toggleModal);
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
    colorSelect: {
        marginTop: 14,
        alignItems: 'center'
    },
});