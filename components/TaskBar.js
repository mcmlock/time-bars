import { StyleSheet, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const TaskBar = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <FontAwesomeIcon 
                icon={faPlus} 
                size={40} 
                style={styles.icon}
                color='black' 
                onPress={() => navigation.navigate('Create')}
            />
        </View>
    )
}

export default TaskBar;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    icon: {
        marginTop: 10,
        marginRight: 10
    }
})