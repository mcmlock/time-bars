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
    // Making the home page contact log the time bars it receives from App.js, THEN setting them for some reason fixes a bug where the timebars appear stacked on one another
    console.log(timeBarsProps);
    setTimeBars(timeBarsProps);
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