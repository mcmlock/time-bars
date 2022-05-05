
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getData(setTimeBars, setOrder) {
    try {
        let timeBars = await AsyncStorage.getItem('timeBars');
        let order = await AsyncStorage.getItem('order');
        if (timeBars && order) {
            timeBars = JSON.parse(timeBars);
            order = JSON.parse(order);
            const orderedTimeBars = [];
            for (let i = 0; i < order.length; i++) {
                const nextTimeBar = timeBars.filter(timeBar => timeBar.key == order[i])[0];
                // Rewrite the keys for the objects
                nextTimeBar.key = i;
                orderedTimeBars.push(nextTimeBar)
            }
            setTimeBars(orderedTimeBars);

            // Save the new versions of the time bars with updated keys
            const newTimeBars = [];
            for (let i = 0; i < orderedTimeBars.length; i++) {
                newTimeBars.push(orderedTimeBars[i]);
            }
            const jsonTimeBars = JSON.stringify(newTimeBars);
            await AsyncStorage.setItem('timeBars', jsonTimeBars);

            // Resets the order
            const resetOrder = [];
            for (let i = 0; i < order.length; i++) {
                resetOrder.push(i);
            }
            setOrder(resetOrder);
            const jsonOrder = JSON.stringify(resetOrder);
            await AsyncStorage.setItem('order', jsonOrder);

        }
        //      AsyncStorage.clear();  
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
        console.log(updatedTimeBars);
        setTimeBars(updatedTimeBars);
        const jsonTimeBars = JSON.stringify(updatedTimeBars);
        await AsyncStorage.setItem('timeBars', jsonTimeBars);

        // Updates the order
        const updatedOrder = order;
        updatedOrder.push(newTimeBar.key);
        console.log(updatedOrder);
        setOrder(updatedOrder);
        const jsonOrder = JSON.stringify(order);
        await AsyncStorage.setItem('order', jsonOrder);
    } catch (err) {
        console.log(err);
    }
}

export async function saveNewOrder(order, setOrder, timeBars) {
    try {
        const jsonOrder = JSON.stringify(order);
        await AsyncStorage.setItem('order', jsonOrder);
        setOrder(order);
    } catch (err) {
        console.log(err);
    }
}