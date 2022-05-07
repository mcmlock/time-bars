import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { deleteTimeBar } from '../resources/storageFunctions';

const ViewScreen = ({ navigation, selectedTimeBar, timeBars, setTimeBars, order, setOrder }) => {
    return (
        <SafeAreaView>
            <Text style={styles.title}>{selectedTimeBar.title}</Text>
            <TouchableOpacity
                style={styles.backBtn}
                onPress={() => navigation.navigate('Home')}
            >
                <Text>
                    Back
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => {
                    deleteTimeBar(selectedTimeBar, timeBars, setTimeBars, order, setOrder);
                    navigation.navigate('Home');
                }}
            >
                <Text>
                    Delete
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ViewScreen;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        textAlign: 'center'
    },
    backBtn: {
        marginTop: 20,
        padding: 15,
        borderColor: 'black',
        borderWidth: 1
    },
    deleteBtn: {
        marginTop: 20,
        padding: 15,
        borderColor: 'black',
        borderWidth: 1
    }
})