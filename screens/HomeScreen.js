import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import SortableList from 'react-native-sortable-list';
import TimeBar from "../components/TimeBar";
import BottomBar from "../components/BottomBar";
import { getData, saveNewOrder } from "../resources/storageFunctions";

const window = Dimensions.get('window');

const HomeScreen = ({ navigation, timeBarsProps, selectTimeBar, order, setOrder }) => {

  const renderTimeBar = useCallback(({ data, active }) => {
    return <TimeBar data={data} active={active} selectTimeBar={selectTimeBar} navigation={navigation} />;
  }, []);

  const [timeBars, setTimeBars] = useState({});

  useEffect(() => {
    // Short delay, solves an issue with the time bars rendering stacked on top of each other in the sortable list
    setTimeout(() => {
      setTimeBars(timeBarsProps);
    }, 0)

  }); 

  return (
    <SafeAreaView style={styles.container}>
      <SortableList
        data={timeBars}
        renderRow={renderTimeBar}
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        order={order}
        onChangeOrder={newOrder => {
          saveNewOrder(newOrder);
          setOrder(newOrder)
        }}
      />
      <BottomBar navigation={navigation} />
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