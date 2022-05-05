import { useMemo, useRef, useEffect } from "react";
import { StyleSheet, Animated, Text, Easing, Platform, Dimensions } from 'react-native';

const window = Dimensions.get('window');

const TimeBar = props => {

    const { data, active } = props;

    const activeAnim = useRef(new Animated.Value(0));
    const style = useMemo(
        () => ({
            ...Platform.select({
                ios: {
                    transform: [
                        {
                            scale: activeAnim.current.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 1.07],
                            }),
                        },
                    ],
                    shadowRadius: activeAnim.current.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2, 10],
                    }),
                },

                android: {
                    transform: [
                        {
                            scale: activeAnim.current.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 1.07],
                            }),
                        },
                    ],
                    elevation: activeAnim.current.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2, 6],
                    }),
                },
            }),
        }),
        [],
    );
    useEffect(() => {
        Animated.timing(activeAnim.current, {
            duration: 300,
            easing: Easing.bounce,
            toValue: Number(active),
            useNativeDriver: true,
        }).start();
    }, [active]);

    return (
        <Animated.View style={[styles.row, style]}>
            <Text style={styles.text}>{data.title}</Text>
        </Animated.View>
    );
}

export default TimeBar;

const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 16,
      height: 80,
      flex: 1,
      marginTop: 7,
      marginBottom: 12,
      borderRadius: 4,
      ...Platform.select({
        ios: {
          width: window.width - 30 * 2,
          shadowColor: 'rgba(0,0,0,0.2)',
          shadowOpacity: 1,
          shadowOffset: {height: 2, width: 2},
          shadowRadius: 2,
        },
        android: {
          width: window.width - 30 * 2,
          elevation: 0,
          marginHorizontal: 30,
        },
      }),
    },
    text: {
      fontSize: 24,
      color: '#222222',
    },
  });
