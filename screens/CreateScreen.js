import { useState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Text } from 'react-native';

const CreateScreen = ({ navigation }) => {

    const [title, setTitle] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.textInput}
                value={title}
                onChangText={input => setTitle(input)}
            />
            <TouchableOpacity
                style={styles.createBtn}
                onPress={() => console.log('Working')}
            >
                <Text>
                    Create Time Bar
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.createBtn}
                onPress={() => navigation.navigate('Home')}
            >
                <Text>
                    Back
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default CreateScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        width: '90%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black'
    },
    createBtn: {
        marginTop: 20,
        padding: 15,
        borderColor: 'black',
        borderWidth: 1
    },
    backBtn: {
        marginTop: 20,
        padding: 15,
        borderColor: 'black',
        borderWidth: 1
    }
})