import { StyleSheet, Modal, Text, View, TouchableOpacity } from 'react-native';
import { deleteTimeBar } from '../../resources/storageFunctions';

export const DeletionModal = ({ visible, toggleModal, navigation, selectedTimeBar, timeBars, setTimeBars, order, setOrder, setDeleteBar }) => {
    return (
        <Modal visible={visible}>
            <View style={styles.modalView}>
                <View style={styles.contentView}>
                    <TouchableOpacity
                        style={{ marginHorizontal: 50.0, justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}
                        onPress={() => {
                            deleteTimeBar(selectedTimeBar, timeBars, setTimeBars, order, setOrder);
                            setDeleteBar(true);
                            toggleModal(false);
                        }}
                    >
                        <Text style={{ fontSize: 20.0, alignSelf: 'center' }}>Confirm Deletion</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
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