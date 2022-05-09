
import AsyncStorage from "@react-native-async-storage/async-storage";
import { calcTodayValue } from "./dateFunctions";

export async function getData(setTimeBars, setOrder) {
    try {
        let timeBars = await AsyncStorage.getItem('timeBars');
        let order = await AsyncStorage.getItem('order');
        if (timeBars && order) {
            timeBars = JSON.parse(timeBars);
            order = JSON.parse(order);
            setTimeBars(timeBars);
            setOrder(order);
        }
       //       AsyncStorage.clear();  
    } catch (err) {
        console.log(err);
    }
}

export async function createTimeBar(timeBars, setTimeBars, newTimeBar, order, setOrder) {
    getData(setTimeBars, setOrder);
    try {
        // Saves the mew time bar
        const updatedTimeBars = timeBars;
        updatedTimeBars.push(newTimeBar);
        setTimeBars(updatedTimeBars);
        const jsonTimeBars = JSON.stringify(updatedTimeBars);
        await AsyncStorage.setItem('timeBars', jsonTimeBars);

        // Updates the order
        const updatedOrder = order;
        updatedOrder.push(newTimeBar.key);
        setOrder(updatedOrder);
        const jsonOrder = JSON.stringify(order);
        await AsyncStorage.setItem('order', jsonOrder);
    } catch (err) {
        console.log(err);
    }
}

export async function deleteTimeBar(selectedTimebar, timeBars, setTimeBars, order, setOrder) {
    try {
        let timeBarsToKeep = timeBars.filter(timeBar => timeBar.key !== selectedTimebar.key);
        timeBarsToKeep = timeBarsToKeep.map(timeBar => {
            if (timeBar.key > selectedTimebar.key) {
                return { ...timeBar, key: timeBar.key - 1 }
            } else {
                return { ...timeBar };
            }
        });
        timeBarsToKeep = JSON.stringify(timeBarsToKeep);
        await AsyncStorage.setItem('timeBars', timeBarsToKeep);

        let updatedOrder = order.map(id => {
            if (id > selectedTimebar.key) {
                return id - 1;
            } else if (id === selectedTimebar.key) {
                return
            } else {
                return id;
            }
        });
        updatedOrder = updatedOrder.filter(id => id !== undefined);
        updatedOrder = JSON.stringify(updatedOrder);
        await AsyncStorage.setItem('order', updatedOrder);

        getData(setTimeBars, setOrder);
    } catch (err) {
        console.log(err);
    }
}

export async function saveNewOrder(newOrder) {
    try {
        const jsonOrder = JSON.stringify(newOrder);
        await AsyncStorage.setItem('order', jsonOrder);
    } catch (err) {
        console.log(err);
    }
}

export async function resetTimeBars(setTimeBars, setOrder) {
    try {
        let timeBars = await AsyncStorage.getItem('timeBars');
        if (timeBars) {
            timeBars = JSON.parse(timeBars);
            const todayValue = calcTodayValue();
            for (let i = 0; i < timeBars.length; i++) {
                if (todayValue >= timeBars[i].nextReset) {
                    timeBars[i].completedHours = 0;
                    timeBars[i].completedMinutes = 0;
                    timeBars[i].nextReset = timeBars[i].nextReset + 10080;
                }
            } 
            timeBars = JSON.stringify(timeBars);
            await AsyncStorage.setItem('timeBars', timeBars); 
            getData(setTimeBars, setOrder);
        }
    } catch (err) {
        console.log(err);
    }
}

export async function quickAdd(selectedTimeBar, timeBars, setTimeBars, hrsToAdd, minsToAdd, toggleQuickAdd) {
    try {
        const updatedTimeBars = timeBars;
        const key = selectedTimeBar.key;
        const completedHrs = Number(updatedTimeBars[key].completedHours);
        const completedMins = Number(updatedTimeBars[key].completedMinutes);
        const totalTime = (completedHrs * 60) + completedMins + (hrsToAdd * 60) + minsToAdd;
        updatedTimeBars[key].completedHours = Math.floor(totalTime / 60);
        updatedTimeBars[key].completedMinutes = totalTime % 60;
        setTimeBars(updatedTimeBars);
        const jsonTimeBars = JSON.stringify(updatedTimeBars);
        await AsyncStorage.setItem('timeBars', jsonTimeBars); 
        toggleQuickAdd(false);
    } catch (err) {
        console.log(err);
    }
}

export async function editTitle(selectedTimeBar, timeBars, setTimeBars, setOrder, newTitle, toggleModal) {
    try {
        const updatedTimeBars = timeBars;
        const key = selectedTimeBar.key;
        updatedTimeBars[key].title = newTitle;
        setTimeBars(updatedTimeBars);
        const jsonTimeBars = JSON.stringify(updatedTimeBars);
        await AsyncStorage.setItem('timeBars', jsonTimeBars); 
        getData(setTimeBars, setOrder);
        toggleModal(false);
    } catch (err) {
        console.log(err);
    }
}