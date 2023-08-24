import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, PermissionsAndroid, ToastAndroid, Button } from "react-native";
import { assets, COLORS, SHADOWS, SIZES, FONTS } from '../constants';
import LinearGradient from "react-native-linear-gradient";
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
export function Home({ navigation }) {
    const [isEnabled, setIsEnabled] = useState(false);
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const enable = () => {
        return BluetoothStateManager.enable().then((result) => {
            // do something...
            console.log("enable");
        });
    };
    const disable = () => {
        return BluetoothStateManager.disable().then((result) => {
            // do something...
            console.log("disable");
        });
    };
    const requestPermissions = async (cb) => {
        if (Platform.OS === "android") {
            //      const apiLevel = await DeviceInfo.getApiLevel();
            if (20 < 31) {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Location Permission",
                        message: "Bluetooth Low Energy requires Location",
                        buttonNeutral: "Ask Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK",
                    }
                );
                cb(granted === PermissionsAndroid.RESULTS.GRANTED);
            } else {
                const result = await requestMultiple([
                    PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
                    PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
                    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                ]);
                const isGranted =
                    result["android.permission.BLUETOOTH"] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    result["android.permission.BLUETOOTH_SCAN"] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    result["android.permission.ACCESS_FINE_LOCATION"] ===
                    PermissionsAndroid.RESULTS.GRANTED;
                cb(isGranted);
            }
        } else {
            cb(true);
        }
    };
    // const openModal = async () => {
    //     requestPermissions((isGranted) => {
    //         if (isGranted) {
    //             // scans();
    //             //         setIsModalVisible(true);
    //         }
    //         {
    //             scan ? alert("the Android Permission is Granted..." + isGranted) : null;
    //         }
    //     });
    // };
    const toggleSwitch = () => {
        setIsEnabled((previousState) => !previousState);
        if (isEnabled === false) {
            enable();
            ToastAndroid.showWithGravityAndOffset(
                'Bluetooh is Enabled'
                , ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                -100, 50)
        }
        if (isEnabled === true) {
            disable();
            ToastAndroid.showWithGravityAndOffset(
                'Bluetooh is Disabled'
                , ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                -100, -500)
        }
    };


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <View style={styles.insideContainer}>
                <Text style={styles.text}>Welcome Bluetooth App</Text>
                <View style={{ flex: .4, justifyContent: 'center' }} >
                    <TouchableOpacity
                        onPress={toggleSwitch}
                        activeOpacity={0.6}>
                        {isEnabled ? (
                            <Image
                                source={assets.images1on}
                                style={styles.blutoothImage}
                            />
                        ) : (
                            <Image
                                source={assets.images1off}
                                style={styles.blutoothImage}
                            />
                        )}
                    </TouchableOpacity>
                </View>
            </View >
        </View>

    );
}

const styles = StyleSheet.create({
    body: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#0A2647",
    },
    text: {
        color: COLORS.darkBlue,
        fontSize: 30,
        textAlign: "center",
        fontWeight: "bold",
        marginTop: 150,
    },
    insideContainer: {
        resizeMode: 'cover',
        height: 485,
        width: 335,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 190,
        marginTop: 100,
        marginLeft: 25,
        marginRight: 30,
    },
    subContainer: {
        width: 350,
        height: 50,
        borderWidth: 1,
        borderColor: "black",
        margin: 2,
        backgroundColor: "#BADAE9",
        color: "white",
    },

    blutoothImage: {
        width: 50,
        height: 50,
        borderRadius: 30,

    },

});
