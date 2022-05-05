import { useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    View,
    Text,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import DayPicker from '../components/DayPicker';
import { createTimeBar, getData } from '../resources/storageFunctions';

const CreateScreen = ({ timeBars, setTimeBars, navigation }) => {

    const [title, setTitle] = useState('');
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [repeatDay, setRepeatDay] = useState(7);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <TextInput
                    style={styles.titleTextInput}
                    value={title}
                    placeholder='Title'
                    onChangeText={input => setTitle(input)}
                />
                <View>
                    <Text style={styles.text}>Weekly Goal</Text>
                    <View style={styles.timeSetter}>
                        <TextInput
                            style={styles.timeTextInput}
                            value={hours}
                            placeholder='HH'
                            keyboardType='number-pad'
                            maxLength={2}
                            onChangeText={input => setHours(input)}
                        />
                        <Text style={styles.text}>:</Text>
                        <TextInput
                            style={styles.timeTextInput}
                            value={minutes}
                            placeholder='MM'
                            keyboardType='number-pad'
                            maxLength={2}
                            onChangeText={input => setMinutes(input)}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.text}>on</Text>
                    <DayPicker repeatDay={repeatDay} setRepeatDay={setRepeatDay} />
                </View>
                <View style={styles.bottomBtnsRow}>
                    <TouchableOpacity
                        style={styles.createBtn}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text>
                            Back
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.createBtn}
                        onPress={() => {
                            const newTimeBar = {
                                title,
                                hours,
                                minutes,
                                repeatDay
                            }
                            createTimeBar(timeBars, setTimeBars, newTimeBar);
                            getData(setTimeBars);
                            navigation.navigate('Home');
                        }}
                    >
                        <Text>
                            Create
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

export default CreateScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    titleTextInput: {
        height: 40,
        width: '90%',
        marginTop: 50,
        paddingHorizontal: 8,
        paddingVertical: 4,
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
    },
    text: {
        fontSize: 20,
        marginVertical: 5,
        textAlign: 'center'
    },
    timeSetter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    timeTextInput: {
        marginHorizontal: 10,
        paddingHorizontal: 8,
        paddingVertical: 4,
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
    },
    bottomBtnsRow: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    createBtn: {
        marginTop: 20,
        padding: 15,
        borderColor: 'black',
        borderWidth: 1
    },
    backBtn: {
        marginTop: 20,
        padding: 15,
        borderColor: 'black',
        borderWidth: 1
    }
})