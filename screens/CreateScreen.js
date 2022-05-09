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
import { calcFirstReset } from '../resources/dateFunctions';
import { createTimeBar, getData } from '../resources/storageFunctions';

const CreateScreen = ({ timeBars, setTimeBars, order, setOrder, navigation }) => {

    const [title, setTitle] = useState('');
    const [goalHours, setGoalHours] = useState('');
    const [goalMinutes, setGoalMinutes] = useState('');
    const [repeatDay, setRepeatDay] = useState(7);
    const [barColor, setBarColor] = useState('#1fbaed');

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
        const btnStyle = barColor === color.color ? btnStyles.activeColorBtn : btnStyles.inactiveColorBtn;

        return (
            <TouchableOpacity
                style={{ marginHorizontal: 12.0 }}
                onPress={() => {
                    setBarColor(color.color)
                }}>
                <View style={btnStyle} />
            </TouchableOpacity>
        );
    }

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
                            value={goalHours}
                            placeholder='HH'
                            keyboardType='number-pad'
                            maxLength={2}
                            onChangeText={input => setGoalHours(input)}
                        />
                        <Text style={styles.text}>:</Text>
                        <TextInput
                            style={styles.timeTextInput}
                            value={goalMinutes}
                            placeholder='MM'
                            keyboardType='number-pad'
                            maxLength={2}
                            onChangeText={input => setGoalMinutes(input)}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.text}>on</Text>
                    <DayPicker repeatDay={repeatDay} setRepeatDay={setRepeatDay} />
                </View>
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
                <View style={styles.bottomBtnsRow}>
                    <TouchableOpacity
                        style={styles.backBtn}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text>
                            Back
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.createBtn}
                        onPress={() => {
                            if (title !== '' &&
                                ((goalHours !== '' && goalHours !== '0') ||
                                    (goalMinutes !== '' && goalMinutes !== '0'))
                            ) {
                                const firstReset = calcFirstReset(repeatDay);
                                const newTimeBar = {
                                    key: timeBars.length,
                                    title,
                                    goalHours,
                                    goalMinutes,
                                    repeatDay,
                                    completedHours: '0',
                                    completedMinutes: '0',
                                    nextReset: firstReset,
                                    color: barColor
                                }
                                console.log(newTimeBar);
                                if (newTimeBar.goalHours === '') { newTimeBar.goalHours = '0' }
                                if (newTimeBar.goalMinutes === '') { newTimeBar.goalMinutes = '0' }
                                createTimeBar(timeBars, setTimeBars, newTimeBar, order, setOrder);
                                getData(setTimeBars, setOrder);
                                navigation.navigate('Home');
                            }
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
    colorSelect: {
        marginTop: 14,
        alignItems: 'center'
    },
    bottomBtnsRow: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    activeColorBtn: {
        width: 45,
        height: 45,
        borderWidth: 1.4,
        borderColor: 'black'
    },
    inactiveColorBtn: {
        width: 45,
        height: 45,
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