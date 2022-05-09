
import { useMemo, useRef, useEffect, useState } from "react";
import { StyleSheet, Animated, Text, Easing, Platform, Dimensions, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const window = Dimensions.get('window');

const TimeBar = props => {

    const { data, active, selectTimeBar, navigation, toggleQuickAdd } = props;

    const [barWidth, setBarWidth] = useState(0);
    const [barFill, setBarFill] = useState(0);

    const activeAnim = useRef(new Animated.Value(0));
    const style = useMemo(
        () => ({
            ...Platform.select({
                ios: {
                    transform: [
                        {
                            scale: activeAnim.current.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 1.07],
                            }),
                        },
                    ],
                    shadowRadius: activeAnim.current.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2, 10],
                    }),
                },

                android: {
                    transform: [
                        {
                            scale: activeAnim.current.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 1.07],
                            }),
                        },
                    ],
                    elevation: activeAnim.current.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2, 6],
                    }),
                },
            }),
        }),
        [],
    );
    useEffect(() => {
        Animated.timing(activeAnim.current, {
            duration: 300,
            easing: Easing.bounce,
            toValue: Number(active),
            useNativeDriver: true,
        }).start();
    }, [active]);

    // When the app initally loads and data is equal to know because 'getData' hasn't finished running, trying to access data properties causes an error
    // I added a check for data first, and that fixed the bug
    let completedTime;
    let goalTime;
    let progress = 0;
    let color = '#1fbaed';
    if (data) {
        completedTime = Number(data.completedHours) * 60 + Number(data.completedMinutes);
        goalTime = Number(data.goalHours) * 60 + Number(data.goalMinutes);
        progress = Math.floor(completedTime / goalTime * 100);
        color = data.color;
    }

    const getBarFill = (width) => {
        if (data) {
            if (progress > 100) {
                const updatedBarFill = width - 4;
                setBarFill(updatedBarFill)
                    ;
            } else {
                const updatedBarFill = width * progress / 100 - 4;
                setBarFill(updatedBarFill);
            }
        }
    }

    useEffect(() => {
        getBarFill(barWidth);
    }, [barWidth]);


    const progressStr = `${progress}%`;

    if (data) {
        return (
            <Animated.View style={[styles.row, style]}>
                <View style={styles.topRow}>
                    <View style={styles.textView}>
                        <Text style={styles.text}>{data.title}</Text>
                    </View>
                    <View style={styles.leftBtn}>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => {
                                selectTimeBar(data);
                                toggleQuickAdd(true);
                            }}
                        >
                            <FontAwesomeIcon icon={faPlus} size={30} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rightBtn}>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => {
                                selectTimeBar(data);
                                navigation.navigate('View');
                            }}>
                            <FontAwesomeIcon size={30} icon={faChevronRight} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.barView}>
                    <View style={styles.progressBar}
                        onLayout={event => {
                            const { width } = event.nativeEvent.layout;
                            setBarWidth(width);
                        }}
                    >
                        <View style={{ width: barFill, height: 36, backgroundColor: color }} />
                        <Text style={styles.progressText}>{progressStr}</Text>
                    </View>
                </View>
            </Animated.View>

        );
    }
    return <View />
}

export default TimeBar;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 6,
        paddingVertical: 10,
        marginTop: 20,
        height: 106,
        flex: 1,
        borderRadius: 4,
        ...Platform.select({
            ios: {
                width: window.width - 25 * 2,
                shadowColor: 'rgba(0,0,0,0.2)',
                shadowOpacity: 1,
                shadowOffset: { height: 2, width: 2 },
                shadowRadius: 2,
            },
            android: {
                width: window.width - 25 * 2,
                elevation: 0,
            },
        }),
    },
    topRow: {
        width: '100%',
        marginBottom: 10,
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    textView: {
        width: '72%',
        height: 34,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
       },
    text: {
        fontSize: 28,
        color: '#222222',
        letterSpacing: .6,
    },
    barView: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 10,
    },
    progressBar: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: 40.0,
        width: '100%',
        borderWidth: 2,
        borderRadius: 4,
    },
    progressText: {
        position: 'absolute',
        alignSelf: 'flex-end',
        paddingRight: 12,
        fontSize: 18,
    },
    leftBtn: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '14%'
    },
    rightBtn: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '14%'
    },
    btn: {
        height: 30,
        width: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});