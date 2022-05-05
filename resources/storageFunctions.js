import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getData(setTimeBars) {
    try {
        let timeBars = await AsyncStorage.getItem('timeBars');
        if (timeBars) {
            timeBars = JSON.parse(timeBars);
            setTimeBars(timeBars);
        }
    } catch (err) {
        console.log(err);
    }
}

export async function createTimeBar(timeBars, setTimeBars, newTimeBar) {
    try {
        const updatedTimeBars = timeBars;
        updatedTimeBars.push(newTimeBar);
        setTimeBars(updatedTimeBars);
        const jsonTimeBars = JSON.stringify(updatedTimeBars);
        await AsyncStorage.setItem('timeBars', jsonTimeBars);
    } catch (err) {
        console.log(err);
    }
}