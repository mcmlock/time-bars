import { SafeAreaView, StyleSheet } from "react-native";
import TaskBar from "../components/TaskBar";

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <TaskBar />
        </SafeAreaView>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
  });