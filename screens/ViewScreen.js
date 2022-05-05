import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';

const ViewScreen = ({ timeBar, navigation }) => {
    return (
        <SafeAreaView>
            <Text style={styles.title}>{timeBar.title}</Text>
            <TouchableOpacity
                style={styles.backBtn}
                onPress={() => navigation.navigate('Home')}
            >
                <Text>
                    Back
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ViewScreen;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        textAlign: 'center'
    },
    backBtn: {
        marginTop: 20,
        padding: 15,
        borderColor: 'black',
        borderWidth: 1
    }
})