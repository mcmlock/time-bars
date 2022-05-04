import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

const DayBtn = ({ dayText, dayValue, repeatDay, setRepeatDay }) => {
    return (
        <TouchableOpacity
            style={repeatDay === dayValue ? styles.dayBtnSelected : styles.dayBtn}
            onPress={() => setRepeatDay(dayValue)}
        >
            <Text>{dayText}</Text>
        </TouchableOpacity >
    );
}

const DayPicker = ({ repeatDay, setRepeatDay }) => {
    return (
        <View style={styles.dayPicker}>
            <DayBtn
                dayText='S'
                dayValue={1}
                repeatDay={repeatDay}
                setRepeatDay={setRepeatDay}
            />
            <DayBtn
                dayText='M'
                dayValue={2}
                repeatDay={repeatDay}
                setRepeatDay={setRepeatDay}
            />
            <DayBtn
                dayText='T'
                dayValue={3}
                repeatDay={repeatDay}
                setRepeatDay={setRepeatDay}
            />
            <DayBtn
                dayText='W'
                dayValue={4}
                repeatDay={repeatDay}
                setRepeatDay={setRepeatDay}
            />
            <DayBtn
                dayText='Th'
                dayValue={5}
                repeatDay={repeatDay}
                setRepeatDay={setRepeatDay}
            />
            <DayBtn
                dayText='F'
                dayValue={6}
                repeatDay={repeatDay}
                setRepeatDay={setRepeatDay}
            />
            <DayBtn
                dayText='S'
                dayValue={7}
                repeatDay={repeatDay}
                setRepeatDay={setRepeatDay}
            />
        </View>
    );
}

export default DayPicker;

const styles = StyleSheet.create({
    dayPicker: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '70%'
    },
    dayBtn: {

    },
    dayBtnSelected: {
        borderWidth: 1
    },
});