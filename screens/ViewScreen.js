import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { deleteTimeBar } from '../resources/storageFunctions';
import { getDayName } from '../resources/dateFunctions';
import { EditTitleModal } from '../components/modals/EditTitleModal';
import { EditColorModal } from '../components/modals/EditColorModal';
import { EditProgressModal } from '../components/modals/EditProgressModal';
import { EditGoalModal } from '../components/modals/EditGoalModal';
import { EditRepeatDay } from '../components/modals/EditRepeatDayModal';

const ViewScreen = ({ navigation, selectTimeBar, selectedTimeBar, timeBars, setTimeBars, order, setOrder }) => {

    const [barWidth, setBarWidth] = useState(0);
    const [barFill, setBarFill] = useState(0);
    const [editTitleVisible, toggleEditTitle] = useState(false);
    const [editColorVisible, toggleEditColor] = useState(false);
    const [editProgressVisible, toggleEditProgress] = useState(false);
    const [editGoalVisible, toggleEditGoal] = useState(false);
    const [editRepeatDayVisible, toggleEditRepeatDay] = useState(false);

    const completedTime = Number(selectedTimeBar.completedHours) * 60 + Number(selectedTimeBar.completedMinutes);
    const goalTime = Number(selectedTimeBar.goalHours) * 60 + Number(selectedTimeBar.goalMinutes);
    const progress = Math.floor(completedTime / goalTime * 100);

    const completedStr = `${selectedTimeBar.completedHours} Hours ${selectedTimeBar.completedMinutes} Minutes Completed`;
    const goalStr = `${selectedTimeBar.goalHours} Hours ${selectedTimeBar.goalMinutes} Minutes Goal`;
    const remainingTime = (Number(selectedTimeBar.goalHours) * 60 + Number(selectedTimeBar.goalMinutes)) - (Number(selectedTimeBar.completedHours) * 60 + Number(selectedTimeBar.completedMinutes));
    const remainingHours = Math.floor(remainingTime / 60);
    const remainingMinutes = remainingTime % 60;
    const remainingStr = `${remainingHours} Hours ${remainingMinutes} Minutes Left`;
    const dayDue = getDayName(selectedTimeBar.repeatDay);
    const dueStr = `by ${dayDue}`;

    const getBarFill = (width) => {
        if (progress > 100) {
            const updatedBarFill = width - 4;
            setBarFill(updatedBarFill)
                ;
        } else {
            const updatedBarFill = width * progress / 100 - 4;
            setBarFill(updatedBarFill);
        }
    }

    useEffect(() => {
        getBarFill(barWidth);
    }, [editProgressVisible, editGoalVisible])

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={() => toggleEditTitle(true)}
            >
                <Text style={styles.title}>{selectedTimeBar.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.progressBar}
                onLayout={event => {
                    setBarWidth(event.nativeEvent.layout.width);
                    getBarFill(barWidth);
                }}
                onPress={() => toggleEditColor(true)}
            >
                <View style={{ width: barFill, height: 60, backgroundColor: selectedTimeBar.color }} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => toggleEditProgress(true)}
            >
                <Text style={styles.subtitle}>{completedStr}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => toggleEditGoal(true)}
            >
                <Text style={styles.subtitle}>{goalStr}</Text>
            </TouchableOpacity>
            <Text style={styles.subtitle}>{remainingStr}</Text>
            <TouchableOpacity onPress={() => toggleEditRepeatDay(true)}>
                <Text style={styles.subtitle}>{dueStr}</Text>
            </TouchableOpacity>
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

            <EditTitleModal
                visible={editTitleVisible}
                toggleModal={toggleEditTitle}
                selectedTimeBar={selectedTimeBar}
                selectTimeBar={selectTimeBar}
                timeBars={timeBars}
                setTimeBars={setTimeBars}
                setOrder={setOrder}
            />
            <EditColorModal
                visible={editColorVisible}
                toggleModal={toggleEditColor}
                selectedTimeBar={selectedTimeBar}
                selectTimeBar={selectTimeBar}
                timeBars={timeBars}
                setTimeBars={setTimeBars}
                setOrder={setOrder}
            />
            <EditProgressModal
                visible={editProgressVisible}
                toggleModal={toggleEditProgress}
                selectedTimeBar={selectedTimeBar}
                selectTimeBar={selectTimeBar}
                timeBars={timeBars}
                setTimeBars={setTimeBars}
                setOrder={setOrder}
            />
            <EditGoalModal
                visible={editGoalVisible}
                toggleModal={toggleEditGoal}
                selectedTimeBar={selectedTimeBar}
                selectTimeBar={selectTimeBar}
                timeBars={timeBars}
                setTimeBars={setTimeBars}
                setOrder={setOrder}
            />
            <EditRepeatDay
                visible={editRepeatDayVisible}
                toggleModal={toggleEditRepeatDay}
                selectedTimeBar={selectedTimeBar}
                selectTimeBar={selectTimeBar}
                timeBars={timeBars}
                setTimeBars={setTimeBars}
                setOrder={setOrder}
            />
        </SafeAreaView >
    )
}

export default ViewScreen;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    title: {
        fontSize: 42,
        textAlign: 'center',
        marginTop: 20
    },
    progressBar: {
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: 64.0,
        width: '80%',
        borderWidth: 2.0,
        borderRadius: 4.0,
    },
    subtitle: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 5
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