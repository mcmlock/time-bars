import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, } from '@fortawesome/free-solid-svg-icons';

const BottomBar = ({ navigation }) => {

    const [iconColor, setIconColor] = useState('black');

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.btn}
                onPressIn={() => setIconColor('#1fbaed')}
                onPressOut={() => setIconColor('black')}
                onPress={() => navigation.navigate('Create')}>
                <FontAwesomeIcon
                    icon={faPlus}
                    size={48}
                    style={styles.icon}
                    color={iconColor}
                />
            </TouchableOpacity>
        </View>
    )
}

export default BottomBar;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    btn: {
        height: 70,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        marginTop: 15,
    }
})