import React, { useCallback, useEffect, useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Platform,
    Dimensions,
} from "react-native";
import TaskBar from "../components/TaskBar";
import SortableList from 'react-native-sortable-list';
import TimeBar from "../components/TimeBar";

const window = Dimensions.get('window');



const HomeScreen = ({ navigation, timeBarsProps, selectTimeBar }) => {

    const renderTimeBar = useCallback(({ data, active }) => {
        return <TimeBar data={data} active={active} selectTimeBar={selectTimeBar} navigation={navigation} />;
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
  });
