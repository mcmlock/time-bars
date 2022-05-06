
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        //      AsyncStorage.clear();  
    } catch (err) {
        console.log(err);
    }
}

export async function createTimeBar(timeBars, setTimeBars, newTimeBar, order, setOrder) {
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

export async function saveNewOrder(newOrder) {
    try {
        const jsonOrder = JSON.stringify(newOrder);
        await AsyncStorage.setItem('order', jsonOrder);
    } catch (err) {
        console.log(err);
    }
}