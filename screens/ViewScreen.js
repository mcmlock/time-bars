import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { deleteTimeBar } from '../resources/storageFunctions';

const ViewScreen = ({ navigation, selectedTimeBar, timeBars, setTimeBars, order, setOrder }) => {
    const completitionStr = `${selectedTimeBar.completedHours} Hours ${selectedTimeBar.completedMinutes} Minutes Out of ${selectedTimeBar.goalHours} Hours ${selectedTimeBar.goalMinutes} Minutes`;
    const remainingTime = (Number(selectedTimeBar.goalHours) * 60 + Number(selectedTimeBar.goalMinutes)) - (Number(selectedTimeBar.completedHours) * 60 + Number(selectedTimeBar.completedMinutes));
    console.log(remainingTime);
    const remainingHours = Math.floor(remainingTime / 60);
    const remainingMinutes = remainingTime % 60;
    const remainingStr = `${remainingHours} Hours ${remainingMinutes} Minutes Left`;
    return (
        <SafeAreaView>
            <Text style={styles.title}>{selectedTimeBar.title}</Text>
            <Text style={styles.subtitle}>{completitionStr}</Text>
            <Text style={styles.subtitle}>{remainingStr}</Text>
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
        fontSize: 42,
        textAlign: 'center',
        marginTop: 20
    },
    subtitle: {
        fontSize: 20,
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