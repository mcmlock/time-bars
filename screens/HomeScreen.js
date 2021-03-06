import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import SortableList from 'react-native-sortable-list';
import TimeBar from "../components/TimeBar";
import BottomBar from "../components/BottomBar";
import { QuickAddModal } from "../components/modals/QuickAddModal";
import { saveNewOrder } from "../resources/storageFunctions";

const window = Dimensions.get('window');

const HomeScreen = ({ navigation, timeBarsProps, selectedTimeBar, selectTimeBar, order, setOrder }) => {

  const [timeBars, setTimeBars] = useState({});
  const [quickAddOpen, toggleQuickAdd] = useState(false);

  useEffect(() => {
    // Short delay, solves an issue with the time bars rendering stacked on top of each other in the sortable list
    setTimeout(() => {
      setTimeBars(timeBarsProps);
    }, 0)
  });

  const renderTimeBar = useCallback(({ data, active }) => {
    return <TimeBar
      data={data}
      active={active}
      selectTimeBar={selectTimeBar}
      navigation={navigation}
      toggleQuickAdd={toggleQuickAdd}
    />
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSpacer} />
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

      <QuickAddModal
        visible={quickAddOpen}
        toggleQuickAdd={toggleQuickAdd}
        selectedTimeBar={selectedTimeBar}
        timeBars={timeBars}
        setTimeBars={setTimeBars}
        setOrder={setOrder}
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
  },
  topSpacer: {
    height: 30,
  },
  list: {
    flex: 1,
  },
  contentContainer: {
    width: window.width,
    ...Platform.select({
      ios: {
        paddingHorizontal: 25,
      },
      android: {
        paddingHorizontal: 25,
      },
    }),
  },
});