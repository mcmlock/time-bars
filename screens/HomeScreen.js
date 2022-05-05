import React, { useCallback, useRef, useMemo, useEffect, useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Animated,
    Text,
    Easing,
    Platform,
    Dimensions,
    Image
} from "react-native";
import TaskBar from "../components/TaskBar";
import SortableList from 'react-native-sortable-list';

const window = Dimensions.get('window');

const TimeBar = props => {

    const { data, active } = props;

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

    return (
        <Animated.View style={[styles.row, style]}>
            <Text style={styles.text}>{data.title}</Text>
        </Animated.View>
    );
}

const HomeScreen = ({ navigation, timeBarsProps }) => {

    const renderTimeBar = useCallback(({ data, active }) => {
        return <TimeBar data={data} active={active} />;
    }, []); 

    const [timeBars, setTimeBars] = useState({});
    
    useEffect(() => {
        setTimeBars(timeBarsProps);
    })

    return (
        <SafeAreaView style={styles.container}>
            <TaskBar navigation={navigation} />
            <SortableList
                data={timeBars}
                renderRow={renderTimeBar}
                style={styles.list}
                contentContainerStyle={styles.contentContainer}
            />
        </SafeAreaView>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#eee',
      ...Platform.select({
        ios: {
          paddingTop: 20,
        },
      }),
    },
    title: {
      fontSize: 20,
      paddingVertical: 20,
      color: '#999999',
    },
    list: {
      flex: 1,
    },
    contentContainer: {
      width: window.width,
      ...Platform.select({
        ios: {
          paddingHorizontal: 30,
        },
        android: {
          paddingHorizontal: 0,
        },
      }),
    },
    row: {
      flexDirection: 'row',
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
          shadowOffset: {height: 2, width: 2},
          shadowRadius: 2,
        },
        android: {
          width: window.width - 30 * 2,
          elevation: 0,
          marginHorizontal: 30,
        },
      }),
    },
    image: {
      width: 50,
      height: 50,
      marginRight: 30,
      borderRadius: 25,
    },
    text: {
      fontSize: 24,
      color: '#222222',
    },
  });
