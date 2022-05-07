import { useMemo, useRef, useEffect } from "react";
import { StyleSheet, Animated, Text, Easing, Platform, Dimensions, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const window = Dimensions.get('window');

const TimeBar = props => {

    const { data, active, selectTimeBar, navigation } = props;

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

    if (data) {
        return (
            <Animated.View style={[styles.row, style]}>
                <View style={styles.leftSide}>
                    <TouchableOpacity
                        style={styles.btn}
                    >
                        <FontAwesomeIcon icon={faPlus} size={24} />
                    </TouchableOpacity>
                </View>
                <View style={styles.centerPiece}>
                    <Text style={styles.text}>{data.title}</Text>
                    <View style={styles.progressBar}>

                    </View>
                </View>
                <View style={styles.leftSide}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                            selectTimeBar(data);
                            navigation.navigate('View');
                        }}>
                        <FontAwesomeIcon size={24} icon={faChevronRight} />
                    </TouchableOpacity>
                </View>
            </Animated.View>

        );
    }
    return <View />
}

export default TimeBar;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        height: 80,
        flex: 1,
        marginTop: 7,
        marginBottom: 12,
        borderRadius: 4,
        ...Platform.select({
            ios: {
                width: window.width - 30 * 2,
                shadowColor: 'rgba(0,0,0,0.2)',
                shadowOpacity: 1,
                shadowOffset: { height: 2, width: 2 },
                shadowRadius: 2,
            },
            android: {
                width: window.width - 30 * 2,
                elevation: 0,
                marginHorizontal: 30,
            },
        }),
    },
    leftSide: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '15%'
    },
    centerPiece: {
        flex: 1,
        width: '70%',
        paddingHorizontal: 10
    },
    rightSide: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '15%'
    },
    text: {
        fontSize: 24,
        color: '#222222',
    },
    progressBar: {
        width: '100%',
        height: 20,
        borderWidth: 1,

    },
    btn: {
        height: 30,
        width: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
