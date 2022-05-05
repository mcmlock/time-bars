import { StyleSheet, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const BottomBar = ({ navigation }) => {
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

export default BottomBar;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    icon: {
        marginBottom: 10,
    }
})