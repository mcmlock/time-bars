import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import TaskBar from './components/TaskBar';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <TaskBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
